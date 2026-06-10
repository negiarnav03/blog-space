import React, {useEffect, useState} from 'react'
import { Container, PostForm } from '../components'
import appwriteService from '../appwrite/config'
import { useNavigate, useParams } from 'react-router-dom'


function EditPosts() {
    const [post, setPost] = useState(null)
    const {slug} = useParams() // it is used to get the id of the post from the url
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPost(post)
                }
            })
        } else {
            navigate("/")
        }
    }, [slug, navigate])


  return post ? (
    <div className='py-8'>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
  )  : null 
}

export default EditPosts