import ProfileOne from './ProfileOne'
import { useEffect, useState } from 'react'
import { Row } from 'react-bootstrap/'
import { fetchGetProfiles } from '../../data/fetch'

function ProfileList() {
    const [profile, setProfile] = useState([])
    useEffect(() => {
        fetchGetProfiles().then(data => setProfile(data))
    }, [])
    console.log(profile)
    return (
    <Row>
        {profile.map(p =>  <ProfileOne key={p._id} profile={p} /> )}
    </Row>
    )
}

export default ProfileList