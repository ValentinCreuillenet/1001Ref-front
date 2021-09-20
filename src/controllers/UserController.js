import axios from 'axios';
import store from "../store/index.ts";
import router from "../router"

const UserController = {
    
    /**
     * crée un nouveau compte utilisateur
     * @param {*} user
     */
    saveUser(user) {
        axios.post('http://localhost:34557/register', JSON.stringify(user), {withCredentials:false})
        .then(function(response){console.log(response.data);})
        .catch(error => {
            this.errorMessage = error.message;
            console.error("There was an error!", error);
        });
    },

      /**
       * vérifie si l'utilisateur demandé existe dans la bdd et renvois son id et son role dans le store
       * @param {*} credentials représente les credentials envoyés par l'utilisateur
       */
      checkLogs(credentials) {
        let logs = {"mail": credentials.mail, "password": credentials.password}
        axios.post('http://localhost:34557/getCred', logs, {withCredentials:false})
        .then(function(response) {
            store.commit('setCurrentUser', response.data.userId)
            store.commit('setCurrentRole', response.data.userRole)
            if(store.state.currentUser.role === "Producteur") {
                router.push("/producer/dashboard")
            }else{
                router.push("/distributer/liste")
            }
            
        })
        .catch(err => {
            console.log("err " + err)
        })
    },


    /**
     * Mettre à jour un utilisateur via un formulaire
     */
    updateUser(user) {
        axios.post('http://localhost:34557/user/update', JSON.stringify(user), {withCredentials:false})
        .then(function(response){
            //
        })
        .catch(error => {
            console.log(error)
        })
    },    

    // Récupère toutes les informations d'un utilisateur via son id
    getUser(ID, user) {
        axios.get('http://localhost:34557/profil/' + ID, {withCredentials:false})
        .then(function(response){
        hydrateUser(user, response.data);
        })
        .catch(error => {
            console.log(error)
        })
        return user;
    },
}

    /**
     * @param {*} user
     * @param {*} data
     */
    function hydrateUser(user, data){

        for(let keys in data){if(data[keys] != null) user[keys] = data[keys];}
        user.loaded = true;

    }

export default UserController;
