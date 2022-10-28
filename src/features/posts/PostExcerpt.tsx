import React from "react";
import { Card, Typography, Space, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { PostWithId } from "../../App";

import PostTime from "./PostTime";

const { Title, Paragraph } = Typography;

const PostExcerpt: React.FC<Props> = ({ post, onDeleteClick }) => {
	const navigate = useNavigate();

	return (
		<Card
			className="post-excerpt"
			bodyStyle={{ width: "50vw", boxShadow: "-6px 8px #DDDDDD" }}>
			<Space direction="vertical" size="large">
				<Link to={`post/${post.id}`}>
					<div>
						<Title>{post.title}</Title>
						<Paragraph>
							{post.content.length < 100
								? post.content
								: post.content.substring(0, 100) + "..."}
						</Paragraph>
						<PostTime timestamp={post.date} />
					</div>
				</Link>
				<Space>
					<Button
						onClick={() => {
							navigate(`/edit/${post.id}`);
						}}>
						Edit
					</Button>
					<Button
						onClick={() => {
							onDeleteClick(post.id);
						}}>
						Delete
					</Button>
				</Space>
			</Space>
		</Card>
	);
};

export default PostExcerpt;

interface Props {
	post: PostWithId;
	onDeleteClick: any;
}
