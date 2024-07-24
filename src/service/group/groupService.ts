// services/groupService.js

import CreateGroupDTO from "../../pages/group/types/CreateGroupDto";
import Group from "../../pages/group/types/Group";
import UpdateGroupDTO from "../../pages/group/types/UpdateGroupDto";
import apiClient from "../apiClient";

const getGroups = async (gymId: string) => {
  try {
    const response = await apiClient.get(`/groups/gym/${gymId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch groups", error);
    throw error;
  }
};

const createGroup = async (groupData: CreateGroupDTO): Promise<Group> => {
  try {
    alert(groupData.gymId)
    const response = await apiClient.post(`/groups`, groupData);
    return response.data;
  } catch (error) {
    console.error("Failed to create group", error);
    throw error;
  }
};

const updateGroup = async (
  groupId: string,
  groupData: UpdateGroupDTO
): Promise<Group> => {
  try {
    const response = await apiClient.patch(`/groups/${groupId}`, groupData);
    return response.data;
  } catch (error) {
    console.error("Failed to create group", error);
    throw error;
  }
};

const deleteGroup = async (gymId: string) => {
  try {
    const response = await apiClient.delete(`/groups/${gymId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch groups", error);
    throw error;
  }
};
export { getGroups, createGroup, updateGroup, deleteGroup };
