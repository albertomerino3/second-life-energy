import { User } from "./user.model.js";
import { Role } from "../roles/role.model.js";

// The password hash is excluded by the default scope of the model
const includeRoles = [
    {
        model: Role,
        as: "roles",
        attributes: ["id", "name"],
        through: { attributes: ["assignedAt"] },
    },
];

function withoutPassword(user: User) {
    const { passwordHash, ...safeUser } = user.toJSON();
    return safeUser;
}

export class UserService {
    static async findAll(filters: { isActive?: boolean } = {}) {
        return User.findAll({
            where: filters.isActive === undefined ? {} : { isActive: filters.isActive },
            include: includeRoles,
            order: [["id", "ASC"]],
        });
    }

    static async findById(id: number) {
        return User.findByPk(id, {
            include: includeRoles,
        });
    }

    static async create(data: {
        name: string;
        email: string;
        passwordHash: string;
        isActive?: boolean;
    }) {
        const user = await User.create(data);
        return withoutPassword(user);
    }

    static async update(
        user: User,
        data: {
            name?: string;
            email?: string;
            passwordHash?: string;
            isActive?: boolean;
        }
    ) {
        // Only the fields sent in the body: the instance was loaded without
        // passwordHash (default scope), so it must not be validated if absent
        const editableFields = ["name", "email", "passwordHash", "isActive"] as const;
        const fields = editableFields.filter((field) => data[field] !== undefined);
        if (fields.length === 0) {
            return withoutPassword(user);
        }
        const updatedUser = await user.update(data, { fields: [...fields] });
        return withoutPassword(updatedUser);
    }

    static async delete(user: User) {
        await user.destroy();
    }
}
