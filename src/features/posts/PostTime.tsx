import React from "react";
import { parseISO, formatDistanceToNow } from "date-fns";

interface Props {
	timestamp: string;
}

const PostTime: React.FC<Props> = ({ timestamp }) => {
	let timeAgo = "";
	if (timestamp) {
		const date = parseISO(timestamp);
		const timePeriod = formatDistanceToNow(date);
		timeAgo = `${timePeriod} ago`;
	}
	return (
		<div title={timestamp} style={{ color: "black" }}>
			Posted:{" "}
			<span style={{ opacity: 0.6, fontStyle: "italic" }}>{timeAgo}</span>
		</div>
	);
};

export default PostTime;
