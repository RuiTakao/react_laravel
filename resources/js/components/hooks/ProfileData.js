import axios from "axios";
import { useCallback, useState } from "react"

export const getProfile = () => {
    const [profiles, setProfiles] = useState([]);

    const getProfiles = useCallback(() => {
        axios.get('/dev/react_laravel/public/api/profile').then(res => {
            setProfiles(res.data);
        })
    },[])

    return {getProfiles, profiles}
}

export const saveProfile = request => {

}

export const getPreviewImage = image => {

}

export const getSaveImage = image => {

}