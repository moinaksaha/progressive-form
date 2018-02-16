export const validateForm = ({a, b, text, c})  => {
    if(a && a.length> 0 && b && b!=="" && text && text!=="" && c && c!==""){
        return true;
    }else{
        return false;
    }
}