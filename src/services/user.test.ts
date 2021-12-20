import { userService } from './user';

describe('User test service', () => {
    const res: any = {};
    res.json = jest.fn();
    res.sendStatus = jest.fn();
    res.id = '000';

    test('getUserById should return error', async () => {
        await userService.getUserById(res.id, res);
        expect(res.sendStatus).toHaveBeenLastCalledWith(404);
    });

    test('createUser should return error', async () => {
        await userService.createUser({}, res);
        expect(res.sendStatus).toHaveBeenCalledWith(404);
    });

    test('deleteUser should return error', async () => {
        await userService.deleteUser(null, res);
        expect(res.sendStatus).toHaveBeenLastCalledWith(404);
    });

    test('updateUser should return error', async () => {
        await userService.updateUser(res, res);
        expect(res.sendStatus).toHaveBeenCalledWith(404);
    });

    test('getUserSuggestions should return error', async () => {
        await userService.getUserSuggestions(res, res);
        expect(res.sendStatus).toHaveBeenCalledWith(404);
    });
});
