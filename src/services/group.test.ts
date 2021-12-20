import { GroupService } from './group';

describe('Test Groups Services', () => {
    const testGroupService = new GroupService();
    const res: any = {};
    res.sendStatus = jest.fn().mockReturnValue(res);
    res.json = jest.fn();
    res.name = 'test';
    res.id = '000 ';

    test('getAllGroups should return all groups', async () => {
        await testGroupService.getAllGroups(res);
        expect(res.json).toBeCalledWith(expect.arrayContaining([]));
    });

    test('createGroup should create new group', async () => {
        await testGroupService.createGroup(res.name, res);
        expect(res.json).toBeCalledWith(expect.objectContaining({}));
    });

    test('createGroup should return error', async () => {
        await testGroupService.createGroup(res, res);
        expect(res.sendStatus).toHaveBeenCalledWith(500);
    });

    test('getGroupById should return error', async () => {
        await testGroupService.getGroupById('000', res);
        expect(res.sendStatus).toHaveBeenCalledWith(404);
    });

    test('updateGroupInfo should return error', async () => {
        await testGroupService.updateGroupInfo({ id: res.id, name: res.name }, res);
        expect(res.sendStatus).toBeCalledWith(404);
    });

    test('addUsersToGroups should return error',async()=>{
        await testGroupService.addUsersToGroup(null,null,res)
        expect(res.sendStatus).toHaveBeenCalledWith(404)
    })
});
