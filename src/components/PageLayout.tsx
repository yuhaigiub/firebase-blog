import React from "react";
import { Outlet } from "react-router-dom";

import { Layout, PageHeader, Button, Typography } from "antd";
import { Link } from "react-router-dom";

const { Title } = Typography;
const { Content } = Layout;

const PageLayout: React.FC = () => {
	const headerTitle = (
		<Link to="/">
			<Title style={{ color: "white" }}>My Blog</Title>
		</Link>
	);
	
	return (
		<Layout>
			<PageHeader
				title={headerTitle}
				extra={[
					<Link to="post/add" key="add-button">
						<Button type="primary" size="large">
							Add New Post
						</Button>
					</Link>,
				]}
				style={{
					backgroundColor: "#643a8c",
					padding: "1% 15% 0.5% 15%",
					position: "sticky",
					top: 0,
					zIndex: 1000,
				}}
			/>
			<Content
				style={{ marginTop: "3%", paddingLeft: "15%", paddingRight: "15%" }}>
				<Outlet />
			</Content>
		</Layout>
	);
};

export default PageLayout;
