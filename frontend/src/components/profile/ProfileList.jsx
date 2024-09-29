import ProfileOne from './ProfileOne'
import { useEffect, useState, useContext } from 'react'
import { Container, Row } from 'react-bootstrap/'
import { fetchGetProfiles } from '../../data/fetch'
import { ProfileContext } from '../context/ProfileContextProvider'
import NavbarMe from '../view/NavbarMe'

function ProfileList() {
    const [profile, setProfile] = useState([])
 
    useEffect(() => {
        fetchGetProfiles().then(data => setProfile(data))
    }, [])

    console.log(profile)
    return (<><NavbarMe></NavbarMe><Container>
        <Row>
            {profile.map(p =>  <ProfileOne key={p._id} profile={p} /> )}
        </Row></Container></>
    )
}

export default ProfileList