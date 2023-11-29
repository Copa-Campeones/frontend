export default function isLogged() {
    const user = localStorage.getItem('userCopa');
    console.log(user);
    return true;
}