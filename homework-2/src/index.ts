import 'dotenv/config';
import express from 'express';
import { User } from './types';
import {
    AUTO_SUGGEST_USERS_DEFAULT_LIMIT,
    HTTP_CODE_NOT_FOUND,
    MESSAGE_NOT_FOUND
} from './constants';
import {
    findById,
    generateUserId,
    getAutoSuggestUsers,
    validateSchema
} from './utils';
import {
    newUserSchema,
    existingUserSchema
} from './schemas';

let users: User[] = [];

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    return res.send(users);
});

app.get('/search', (req, res) => {
    const { loginSubstring, limit = AUTO_SUGGEST_USERS_DEFAULT_LIMIT } = req.query;
    if (loginSubstring) {
        return res.send(getAutoSuggestUsers(users, String(loginSubstring), Number(limit)));
    }
    return res.send([]);
});

app.get('/:userId', (req, res) => {
    const result = findById(users, req.params.userId);
    return result
        ? res.send(result)
        : res.status(HTTP_CODE_NOT_FOUND).send(MESSAGE_NOT_FOUND);
});

app.post('/', validateSchema(newUserSchema), (req, res) => {
    const user = {
        id: generateUserId(),
        ...req.body
    };
    users.push(user);
    return res.send(user);
});

app.put('/', validateSchema(existingUserSchema), (req, res) => {
    const user = findById(users, req.body.id);
    if (!user) {
        return res.status(HTTP_CODE_NOT_FOUND).send(MESSAGE_NOT_FOUND);
    }
    const updatedUser = { ...req.body };
    users = [
        ...users.filter(({ id }) => id !== user.id),
        updatedUser
    ];
    return res.send(updatedUser);
});

app.delete('/:userId', (req, res) => {
    const user = findById(users, req.params.userId);
    if (!user) {
        return res.status(HTTP_CODE_NOT_FOUND).send(MESSAGE_NOT_FOUND);
    }
    const updatedUser = {
        ...user,
        isDeleted: true
    };
    users = [
        ...users.filter(({ id }) => id !== user.id),
        updatedUser
    ];
    return res.send(updatedUser);
});

app.listen(process.env.PORT, () =>
    console.log(`App listening on port ${process.env.PORT}`),
);
