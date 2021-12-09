import { Router } from 'express';
import { groupService } from '../services/group';
import { authService } from '../services/auth';

const router = Router();

router.put('/groups', authService.auth, (req, res) => {
    const { name } = req.body;
    console.log(req);
    groupService.createGroup(name, res);
});

router.get('/groups/:id', authService.auth, (req, res) => {
    const { id } = req.params;
    groupService.getGroupById(id, res);
});

router.delete('/groups/:id', authService.auth, (req, res) => {
    const { id } = req.params;
    groupService.deleteGroup(id, res);
});
router.get('/groups', authService.auth, (_, res) => {
    groupService.getAllGroups(res);
});

router.patch('/groups', (req, res) => {
    groupService.updateGroupInfo(req.body, res);
});

router.post('/groups', (req, res) => {
    const { groupId, usersList } = req.body;

    groupService.addUsersToGroup(groupId, usersList, res);
});

export default router;
