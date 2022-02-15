import axios from 'axios';

const BILL_API_BASE_URL="http://localhost:8080/api/v1/billRecord";
const MEMBER_API_BASE_URL="http://localhost:8080/api/v1/members";
const Maintenance_API_BASE_URL="http://localhost:8080/api/v1/societymaintenance";
const Defaulter_API_BASE_URL="http://localhost:8080/api/v1/defaulters";
const ADMIN_API_BASE_URL="http://localhost:8080/api/v1/admin"

class AdminService{
    adminLogin(user){
        return axios.post(ADMIN_API_BASE_URL,user);
    }
    getSocietyMembers(){
        return axios.get(MEMBER_API_BASE_URL);
    }
    getSocietyBill(){
        return axios.get(BILL_API_BASE_URL);
    }
    addUser(user,id){
        return axios.post(MEMBER_API_BASE_URL+"/"+id,user);
    }
    getUserById(id){
        return axios.get(MEMBER_API_BASE_URL+"/"+id);
    }
    deleteMember(id){
        return axios.delete(MEMBER_API_BASE_URL+"/"+id);
    }
    addMaintenanceRecord(record,user,bill,id){
        return axios.post(Maintenance_API_BASE_URL+"/"+id+"/"+user+"/"+bill,record);
    }
    addSocietyBillRecord(record){
        return axios.post(BILL_API_BASE_URL,record);
    }
    getMaintenanceRecords(obj){
        return axios.get(Maintenance_API_BASE_URL);
    }
    getDefaultersRecords(obj){
        return axios.get(Defaulter_API_BASE_URL);
    }
    getMaintenanceRecordById(id){
        return axios.get(Maintenance_API_BASE_URL+"/"+id);
    }
    getSocietyBillRecords(obj){
        return axios.get(Maintenance_API_BASE_URL+"/"+obj.month+"/"+obj.year);
    }
}
export default new AdminService()