const bcrypt = require("bcryptjs");

class Users {
    constructor(defaultData) {
        this.users = defaultData || [];
        this.lastId = this._computeLastId();
    }

    _computeLastId() {
        if (this.users.length === 0) return 0;
        return Math.max(...this.users.map((u) => u.id));
    }

    async create(data) {
        const id = ++this.lastId;
        const now = new Date();
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const newUser = {
            id,
            email: data.email,
            password: hashedPassword,
            username: data.username,
            createdAt: now,
            updatedAt: now
        };
        this.users.push(newUser);
        return { ...newUser, password: undefined };
    }

    async getAll() {
        return this.users.map(u => ({ ...u, password: undefined }));
    }

    async getById(id) {
        const user = this.users.find(u => u.id === +id);
        if (!user) return null;
        return { ...user, password: undefined };
    }

    async getByEmail(email) {
        const user = this.users.find(u => u.email === email);
        if (!user) return null;
        return { ...user, password: undefined };
    }

    async checkPassword(email, password) {
        const user = this.users.find(u => u.email === email);
        if (!user) return false;
        return await bcrypt.compare(password, user.password);
    }
}

const defaultUsers = [
    {
        id: 1,
        email: "user1@email.com",
        password: "$2a$10$hash1", // hash factice
        username: "userone",
        createdAt: new Date("2026-01-01T10:00:00Z"),
        updatedAt: new Date("2026-01-01T10:00:00Z")
    },
    {
        id: 2,
        email: "user2@email.com",
        password: "$2a$10$hash2",
        username: "usertwo",
        createdAt: new Date("2026-01-02T11:00:00Z"),
        updatedAt: new Date("2026-01-02T11:00:00Z")
    }
];

const User = new Users(defaultUsers);
module.exports = { User };
