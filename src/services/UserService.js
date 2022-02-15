import axios from 'axios';

const USER_API_BASE_URL="http://localhost:8080/api/v1/user";
const Maintenance_API_BASE_URL="http://localhost:8080/api/v1/maintenance";
const Bill_API_BASE_URL="http://localhost:8080/api/v1/bill";

class UserService{
    userLogin(user){
        return axios.post(USER_API_BASE_URL,user);
    }

    getMaintenanceData(userID){
        return axios.get(Maintenance_API_BASE_URL+'/'+userID);
    }
    getSocietyBillRecords(){
        return axios.get(Bill_API_BASE_URL);
    }
}
export default new UserService()