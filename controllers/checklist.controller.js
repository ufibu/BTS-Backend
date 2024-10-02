const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");
const { authenticateToken } = require("../middlewares/authentication");
const { getAllChecklists, getChecklistItemByChecklistId, createNewChecklist, deleteChecklistById, updateChecklistItemByChecklistId, renameItemByChecklistId, createNewChecklistItem } = require("../services/checklist.service");


const getAllChecklist = catchAsync(async (req, res) => {
    try {
        const checklists = await getAllChecklists(req.user.id);
        res.json(checklists);
    } catch (error) {
        throw new ApiError(httpStatus.NOT_FOUND, error.message);
    }
})

const createChecklist = catchAsync(async (req, res) => {
    try {
        const { title } = req.body;
        const checklist = await createNewChecklist({ title: title, user: req.user.id });
        res.json(checklist);
    } catch (error) {
        throw new ApiError(httpStatus.BAD_REQUEST, error.message);
    }
})

const deleteChecklistWithID = catchAsync(async (req, res) => {
    try {
        console.log(req.params.checklistId);
        const checklist = await deleteChecklistById(req.params.checklistId);
        res.json(checklist);
    } catch (error) {
        throw new ApiError(httpStatus.NOT_FOUND, error.message);
    }
})

const createChecklistItemByChecklistID = catchAsync(async (req, res) => {
    try {
        const { itemName } = req.body;
        const item = await createNewChecklistItem({ id: req.params.checklistId, title: itemName });
        res.json(item);
    } catch (error) {
        console.log(error);
        throw new ApiError(httpStatus.NOT_FOUND, error.message);
    }
})

const getChecklistItemByChecklistIds = catchAsync(async (req, res) => {
    try {
        const items = await getChecklistItemByChecklistId(req.params.checklistId, req.params.itemId);
        res.json(items);
    } catch (error) {
        throw new ApiError(httpStatus.NOT_FOUND, error.message);
    }
})

const updateChecklistItemByChecklistID = catchAsync(async (req, res) => {
    try {
        const item = await updateChecklistItemByChecklistId(req.params.checklistId, req.params.itemId, req.body);
        res.json(item);
    } catch (error) {
        throw new ApiError(httpStatus.NOT_FOUND, error.message);
    }
})

const deleteChecklistItemByChecklistID = async (checklistId, itemId) => {
    try {
        const checklist = await deleteChecklistById(checklistId, itemId);
        res.json(checklist);
    } catch (error) {
        throw new ApiError(httpStatus.NOT_FOUND, error.message);
    }
}


const renameItemByChecklistID = async (checklistId, itemId, body) => {
    try {
        const { itemName } = body;
        const item = await renameItemByChecklistId(checklistId, itemId, itemName);
        res.json(item);
    } catch (error) {
        throw new ApiError(httpStatus.NOT_FOUND, error.message);
    }
}

module.exports = {
    getAllChecklist,
    createChecklist,
    deleteChecklistWithID,
    createChecklistItemByChecklistID,
    getChecklistItemByChecklistIds,
    updateChecklistItemByChecklistID,
    deleteChecklistItemByChecklistID,
    renameItemByChecklistID
}