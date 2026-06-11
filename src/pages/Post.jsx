import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8 max-w-4xl mx-auto animate-fade-in text-left">
            <Container>
                <div className="w-full mb-6 relative overflow-hidden rounded-2xl bg-[var(--card-bg)] border border-[var(--border)] shadow-2xl max-h-[440px] transition-all duration-700 ease-in-out hover:max-h-[1200px] group cursor-zoom-in">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="w-full h-auto rounded-2xl transition-transform duration-700 ease-in-out group-hover:scale-[1.01]"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6 flex space-x-2">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-emerald-600 hover:bg-emerald-700 transition-all duration-200 shadow-lg" className="mr-0">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-rose-600 hover:bg-rose-700 transition-all duration-200 shadow-lg" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-4xl font-extrabold text-[var(--text-h)] tracking-tight leading-tight mb-2">{post.title}</h1>
                </div>
                <div className="browser-css text-[var(--text)] leading-relaxed text-lg mt-8 border-t border-[var(--border)] pt-8">
                    {parse(post.content)}
                    </div>
            </Container>
        </div>
    ) : null;
}