import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createGroup, getGroups } from "../service/groupService";

export const useGroup = ()=>{
    const [groups, setGroups] = useState<Record<string, string>[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const { gymId } = useParams();
  
    // console.log("grouplist", gym)
  
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
      return groups.filter((group) =>
        group.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    };
  
    const filteredGroups = filterGroups();
  
    const [isAddEditFormOpen, setisAddEditFormOpen] = useState(false);
  
    const openAddEditForm = () => {
      setisAddEditFormOpen(true);
    };
  
    const closeAddEditForm = () => {
      setisAddEditFormOpen(false);
    };
  
    const handleEditExpense = () => {
      // Logic to handle editing expense
      closeAddEditForm(); // Close the modal after editing
    };

    const handleGroupCardClick = (groupId: string)=>{

    }


    const createGymGroup = async (body: {
      groupName: string;
      weekdays: string;
      startTime: string;
      endTime: string;
    }) => {
      // Handle form submission logic here
      try {
        await createGroup({
          gymId,
         ...body,
        });
        closeAddEditForm();
      } catch (error) {
        console.log("error occured on creating group")
      }
    
      // Reset form fields after submission if needed
    };


    return {
        groups,
        createGymGroup,
        searchTerm,
        setSearchTerm,
        openAddEditForm,
        isAddEditFormOpen,
        closeAddEditForm,
        handleEditExpense,
    }
}