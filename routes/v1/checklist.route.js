const express = require('express');
const validate = require('../../middlewares/validate');
const ChecklistController = require('../../controllers/checklist.controller');
const ChecklistValidation = require('../../validations/checklist.validation')
const { authenticateToken } = require('../../middlewares/authentication');


const router = express.Router();

router.get('/', authenticateToken, ChecklistController.getAllChecklist);
router.post('/', [validate(ChecklistValidation.createChecklist), authenticateToken], ChecklistController.createChecklist);
router.get('/:checklistId/item/:itemId', authenticateToken, ChecklistController.getChecklistItemByChecklistIds);
router.post('/:checklistId/item', [validate(ChecklistValidation.createItem), authenticateToken], ChecklistController.createChecklistItemByChecklistID);
router.delete('/:checklistId', authenticateToken, ChecklistController.deleteChecklistWithID);
router.put('/:checklistId/item/:itemId', authenticateToken, ChecklistController.updateChecklistItemByChecklistID);
router.delete('/:checklistId/item/:itemId', authenticateToken, ChecklistController.deleteChecklistItemByChecklistID);
router.put('/:checklistId/item/rename/:itemid', authenticateToken, ChecklistController.renameItemByChecklistID);

module.exports = router;    