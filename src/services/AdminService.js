import axios from 'axios';

const ADMIN_API_BASE_URL="http://localhost:8080/api/v1/admin";
const MEMBER_API_BASE_URL="http://localhost:8080/api/v1/members";
const Bill_API_BASE_URL="http://localhost:8080/api/v1/bill";

class AdminService{
    getSocietyMembers(){
        return axios.get(MEMBER_API_BASE_URL);
    }
    addUser(user){
        console.log('Userad =>'+JSON.stringify(user));
        return axios.post(MEMBER_API_BASE_URL,user);
    }
}
export default new AdminService()