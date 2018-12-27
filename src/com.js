import moment from "moment"

const com = {
    getIdentity(key) {
        let value = "";
        switch (key) {
            case "employee":
                value = "员工";
                break;
            case "manager":
                value = "管理员"
                break;
            default:
                break;
        }
        return value;
    },
    getDate(value) {
        return moment(value).format('YYYY-MM-DD HH:mm:ss');
    }
}

export default com;