"use client";
import { useEffect, useState } from "react";
import { useAddMembersDataMutation, useGetMembersDataQuery } from "@services/department/department-api";
import { useSearchParams } from 'next/navigation'
import toast from "react-hot-toast";
import type {  Dispatch, SetStateAction } from "react"

interface UseAddMembersModal {
    isOpenAddModal: boolean
    setIsOpenAddModal: Dispatch<SetStateAction<boolean>>;
    handleMemberSubmit?: any;
    addMembersData: any;
    getMembersData: any
    user: any;
    setUser: any
    showUser: boolean;
    setShowUser: Dispatch<SetStateAction<boolean>>;
    membersOptions: any
    deleteSelectedTextHandler: any;
    setSearchValues?:any;
    changeFilterHandler:any
}


export function useAddMembersModal(): UseAddMembersModal {
    const [isOpenAddModal, setIsOpenAddModal] = useState<boolean>(false);
    const [user, setUser] = useState<any>(null);
    const [showUser, setShowUser] = useState(false)
    const [searchValues, setSearchValues] = useState('');
    const [resetForm, setResetForm] = useState(false);
    
   

    const departmentId = useSearchParams()
    const id = departmentId.get('id')
    const { data: getMembersData } = useGetMembersDataQuery({  id,search: searchValues,
        offset: 10,
        limit: 100, })
    
    const [addMembersData] = useAddMembersDataMutation()
    const membersOptions = getMembersData?.data? getMembersData?.data.map((item) => ({label: `${item.firstName} ${item.lastName}`,value: item?._id,...item})): []
    const handleMemberSubmit = async (): Promise<void> => {
        try {
            await addMembersData({
                id,
                userId: user.map(({ value }) => value),
            }).unwrap();
            toast.success("Add member successful!")
            setIsOpenAddModal(!isOpenAddModal)
            setResetForm(true);
        } catch (error) {
            toast.error(error?.data?.message || "Error while adding members")
        }
    }
    function deleteSelectedTextHandler(userId: string): void {
        const departments = user?.filter(({ _id }) => _id !== userId)
        setUser(departments)
    }
    function changeFilterHandler(value:any): void {
        setSearchValues(value);
      }
    
      useEffect(() => {
        if (resetForm) {
          setUser(null);
          setResetForm(false);
        }
      }, [resetForm]);
    return {
        isOpenAddModal, setIsOpenAddModal, handleMemberSubmit,
        getMembersData, addMembersData, user, showUser, setUser,
        setShowUser, deleteSelectedTextHandler, membersOptions,
        setSearchValues,changeFilterHandler
    };

}