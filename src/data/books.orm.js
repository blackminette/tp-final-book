const randomDelay = (min = 100, max = 500) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const waitRandomDelay = () => {
    const delay = randomDelay();
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

class Books {
    constructor(defaultData) {
        this.books = defaultData || [];
        this.lastId = this._computeLastId();
    }

    _computeLastId() {
        if (this.books.length === 0) return 0;
        return Math.max(...this.books.map((b) => b.id));
    }

    create = async (data) => {
        await waitRandomDelay();
        const id = ++this.lastId;
        const now = new Date();
        const newBook = {
            id,
            title: typeof data.title === 'string' ? data.title : '',
            content: typeof data.content === 'string' ? data.content : '',
            published: typeof data.published === 'boolean' ? data.published : false,
            userId: data.userId ?? null,
            createdAt: now,
            updatedAt: now
        };
        this.books.push(newBook);
        return newBook;
    };

    getAll = async () => {
        await waitRandomDelay();
        return this.books;
    };

    getById = async (id) => {
        await waitRandomDelay();
        return this.books.find((b) => b.id === Number(id)) || null;
    };

    update = async (id, data) => {
        await waitRandomDelay();
        const book = this.books.find((b) => b.id === Number(id));
        if (!book) return null;
        Object.assign(book, data, { updatedAt: new Date() });
        return book;
    };

    delete = async (id) => {
        await waitRandomDelay();
        const idx = this.books.findIndex((b) => b.id === Number(id));
        if (idx === -1) return false;
        this.books.splice(idx, 1);
        return true;
    };
}

module.exports = Books;