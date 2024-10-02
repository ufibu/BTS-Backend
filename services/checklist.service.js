const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const Checklist = require("../models/Checklist");
const { Types } = require("mongoose");


const getAllChecklists = async (userId) => {
    const checklists = await Checklist.find({ user: userId });
    if (!checklists.length) throw new ApiError(httpStatus.NOT_FOUND, 'No checklists found');
    return checklists;
}

const createNewChecklist = async ({ title, user }) => {
    console.log(title, user);
    const checklist = new Checklist({ title, user });
    await checklist.save();
    return checklist;
}

const deleteChecklistById = async (checklistId) => {
    const checklist = await Checklist.findByIdAndDelete(checklistId);
    if (!checklist) throw new ApiError(httpStatus.NOT_FOUND, 'Checklist not found');
    return checklist;
}

const createNewChecklistItem = async ({ id, title }) => {
    const checklist = await Checklist.findById(id);
    // if (!checklist) throw new ApiError(httpStatus.NOT_FOUND, 'Checklist not found');

    checklist.items.push({ title });
    await checklist.save();
    return checklist.items;
}

const getChecklistItemByChecklistId = async (checklistId, itemId) => {
    const checklist = await Checklist.findById(checklistId);
    if (!checklist) throw new ApiError(httpStatus.NOT_FOUND, 'Checklist not found');

    const item = checklist.items.id(itemId);
    if (!item) throw new ApiError(httpStatus.NOT_FOUND, 'Item not found');
    return item;
}

const updateChecklistItemByChecklistId = async (checklistId, itemId) => {
    const checklist = await Checklist.findById(checklistId);
    if (!checklist) throw new ApiError(httpStatus.NOT_FOUND, 'Checklist not found');

    const item = checklist.items.id(itemId);
    if (!item) throw new ApiError(httpStatus.NOT_FOUND, 'Item not found');

    item.completed = !item.completed;
    await checklist.save();
    return item;
}

const deleteChecklistItemByChecklistId = async (checklistId, itemId) => {
    const checklist = await Checklist.findById(checklistId);
    if (!checklist) throw new ApiError(httpStatus.NOT_FOUND, 'Checklist not found');

    const item = checklist.items.id(itemId);
    if (!item) throw new ApiError(httpStatus.NOT_FOUND, 'Item not found');

    item.remove();
    await checklist.save();
    return item;
}

const renameItemByChecklistId = async (checklistId, itemId, itemName) => {
    const checklist = await Checklist.findById(checklistId);
    if (!checklist) throw new ApiError(httpStatus.NOT_FOUND, 'Checklist not found');

    const item = checklist.items.id(itemId);
    if (!item) throw new ApiError(httpStatus.NOT_FOUND, 'Item not found');

    item.title = itemName;
    await checklist.save();
    return item;
}

module.exports = {
    getAllChecklists,
    createNewChecklist,
    deleteChecklistById,
    createNewChecklistItem,
    getChecklistItemByChecklistId,
    updateChecklistItemByChecklistId,
    deleteChecklistItemByChecklistId,
    renameItemByChecklistId,
}



