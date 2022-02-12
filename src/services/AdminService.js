import axios from 'axios';

const BILL_API_BASE_URL="http://localhost:8080/api/v1/billRecord";
const MEMBER_API_BASE_URL="http://localhost:8080/api/v1/members";
const Maintenance_API_BASE_URL="http://localhost:8080/api/v1/societymaintenance";

class AdminService{
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
    getMaintenanceRecords(obj){
        return axios.get(Maintenance_API_BASE_URL+"/"+obj.month+"/"+obj.year);
    }
    getMaintenanceRecordById(id){
        return axios.get(Maintenance_API_BASE_URL+"/"+id);
    }
}
export default new AdminService()