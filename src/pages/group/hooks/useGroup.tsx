import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createGroup,
  deleteGroup,
  getGroups,
  updateGroup,
} from "../../../service/group/groupService";
import Group from "../types/Group";
import UpdateGroupDTO from "../types/UpdateGroupDto";

export const useGroup = () => {
  const [groups, setGroups] = useState<Group[]>();
  const [searchTerm, setSearchTerm] = useState("");
  const [initialGroupData, setInitialGroupData] = useState<Group>();
  const { gymId } = useParams();

  useEffect(() => {
    // Simulated fetch for group data (replace with actual API call)
    if (!gymId) return;
    fetchGroups();
  }, [gymId]);

  const fetchGroups = useCallback(async () => {
    try {
      console.log("fetch groups");
      const data = await getGroups(gymId!);
      console.log(data);
      setGroups(data);
    } catch (error) {
      console.error("Failed to fetch groups", error);
    }
  }, [gymId]);

  const filterGroups = () => {
    return groups
      ? groups.filter((group) =>
          group.groupName?.toLowerCase().includes(searchTerm?.toLowerCase())
        )
      : [];
  };

  const filteredGroups = filterGroups();

  const [isAddEditFormOpen, setisAddEditFormOpen] = useState(false);

  const openAddEditForm = (formData: Group | null) => {
    setisAddEditFormOpen(true);
    formData && setInitialGroupData(formData);
  };

  const closeAddEditForm = () => {
    setisAddEditFormOpen(false);
    setInitialGroupData(undefined);
  };

  const handleEditExpense = () => {
    // Logic to handle editing expense
    closeAddEditForm(); // Close the modal after editing
  };

  const createGymGroup = async (body: any) => {
    // Handle form submission logic here
    try {
      const group = await createGroup({
        gymId,
        ...body,
      });
      setGroups([group, ...groups]);
      closeAddEditForm();
    } catch (error) {
      console.log("error occured on creating group");
    }
    // Reset form fields after submission if needed
  };

  const updateGymGroup = async (
    groupId: string,
    updateGroupDto: UpdateGroupDTO
  ) => {
    // Handle form submission logic here
    try {
      const updatedGroup = await updateGroup(groupId, updateGroupDto);
      setGroups(
        groups?.map((group) => (group._id === groupId ? updatedGroup : group))
      );
      closeAddEditForm();
    } catch (error) {
      console.log("error occured on creating group");
    }
    // Reset form fields after submission if needed
  };

  const deleteGymGroup = async (groupId: string) => {
    // Handle form submission logic here
    try {
      await deleteGroup(groupId);
      setGroups(groups?.filter((group) => group._id !== groupId));
      closeAddEditForm();
    } catch (error) {
      console.log("error occured on creating group");
    }
    // Reset form fields after submission if needed
  };

  return {
    groups,
    createGymGroup,
    filteredGroups,
    searchTerm,
    setSearchTerm,
    openAddEditForm,
    deleteGymGroup,
    updateGymGroup,
    isAddEditFormOpen,
    closeAddEditForm,
    handleEditExpense,
    initialGroupData,
  };
};
