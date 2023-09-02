import { Collection, Db } from "mongodb";
import { UserEntity } from "../../domain/users/user.entity";
import connect from "../shared/connections/database/mongo";
import { generateUniqueUUID } from "../shared";
import UserError from "../shared/errors/user.error";
import { comparePassword, encryptPassword } from "../shared/helpers/password-encryption";

class UserDAO {
    private collectionName: string = 'users';
    private async getCollection(): Promise<Collection<UserEntity>> {
        const db: Db = await connect();
        return db.collection(this.collectionName);
    }
    async save(user: UserEntity) {
        const collection: Collection<UserEntity> = await this.getCollection();

        const user_email_exist = await collection.findOne({ email: user.email });
        if (user_email_exist) throw new UserError(`User with email ${user.email} already exists.`);

        let new_user: UserEntity = {
            _id: '',
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        }
        let isUnique: boolean = false;
        const encrypted_password = await encryptPassword(user.password);
        try {
            while (!isUnique) {
                const new_id = generateUniqueUUID();
                new_user = {
                    _id: new_id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    password: encrypted_password,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                }
                try {
                    await collection.insertOne(new_user);
                    isUnique = true;
                } catch (error) {
                    if (error instanceof Error && error.message && error.message.includes("duplicate key error")) isUnique = false;
                    else throw new UserError("Error saving the product.");
                }
            }
        } catch (error) {
            if (error instanceof Error && error.message) throw new UserError(error.message);
            else throw new UserError("Error creating the product.");
        }
        return ({
            _id: new_user._id,
            first_name: new_user.first_name,
            last_name: new_user.last_name,
            email: new_user.email,
            created_at: new_user.created_at,
            updated_at: new_user.updated_at,
        });
    }
    async update(id: string, user: UserEntity) {
        try {
            const user_result = await this.findById(id);
            if (!user_result) throw new UserError(`No user found with ID ${id}`);

            const collection: Collection<UserEntity> = await this.getCollection();
            await collection.updateOne({ _id: id }, { $set: {
                first_name: user.first_name ?? user_result.first_name,
                last_name: user.last_name ?? user_result.last_name,
                updated_at: new Date().toISOString()
            }});
            return ({
                _id: user_result._id,
                first_name: user.first_name ?? user_result.first_name,
                last_name: user.last_name ?? user_result.last_name,
                email: user_result.email,
                created_at: user_result.created_at,
                updated_at: user_result.updated_at,
            })
        } catch (error) {
            if (error instanceof Error && error.message) throw new UserError(error.message);
            else throw new UserError("Error updating the user.");
        }
    }
    async delete(id: string) {
        try {
            const user_result = await this.findById(id);
            if (!user_result) throw new UserError(`No user found with ID ${id}`);

            const collection: Collection<UserEntity> = await this.getCollection();
            await collection.deleteOne({ _id: id });
        } catch (error) {
            if (error instanceof Error && error.message) throw new UserError(error.message);
            else throw new UserError("Error deleting the user.");
        }
    }
    async findAll(page: number) {
        try {
            const collection: Collection<UserEntity> = await this.getCollection();
            const users = await collection.find().sort({ created_at: -1 }).skip((page - 1) * 50).limit(50).toArray();
            const total_users = await collection.countDocuments();
            const total_pages = Math.ceil(total_users / 50);
            const current_page = page;
            return { users, total_users, total_pages, current_page };
        } catch (error) {
            if (error instanceof Error && error.message) throw new UserError(error.message);
            else throw new UserError("Error finding the users.");
        }
    }
    async findById(id: string) {
        try {
            const collection: Collection<UserEntity> = await this.getCollection();
            const response = await collection.findOne({ _id: id });

            if (!response) throw new UserError(`No user found with ID ${id}`);
        
            return ({
                _id: response._id,
                first_name: response.first_name,
                last_name: response.last_name,
                email: response.email,
                created_at: response.created_at,
                updated_at: response.updated_at,
            })
        } catch (error) {
            if (error instanceof Error && error.message) throw new UserError(error.message);
            else throw new UserError("Error finding the user.");
        }
    }
    async findByEmail(email: string) {
        try {
            const collection: Collection<UserEntity> = await this.getCollection();
            const response = await collection.findOne({ email });

            if (!response) throw new UserError(`No user found with email ${email}`);
        
            return ({
                _id: response._id,
                first_name: response.first_name,
                last_name: response.last_name,
                email: response.email,
                created_at: response.created_at,
                updated_at: response.updated_at,
            });
        } catch (error) {
            if (error instanceof Error && error.message) throw new UserError(error.message);
            else throw new UserError("Error finding the user.");
        }
    }
    async login(email: string, password: string) {
        try {
            const collection: Collection<UserEntity> = await this.getCollection();
            const user = await collection.findOne({ email });
            if (!user) throw new UserError(`No user found with email ${email}`);

            const isPasswordValid = await comparePassword(password, user.password);
            if (!isPasswordValid) throw new UserError("Invalid password.");

            return user;
        } catch (error) {
            if (error instanceof Error && error.message) throw new UserError(error.message);
            else throw new UserError("Error when logging in.");
        }
    }
}
const userDAO = new UserDAO();
export default userDAO;