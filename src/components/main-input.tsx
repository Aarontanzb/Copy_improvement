import React from 'react';
import { Input } from "@/components/ui/input";

const MainInput: React.FC = () => {
	return (
		<div className="w-full max-w-md mx-auto">
			<Input
				type="text"
				placeholder="Enter your text here"
				className="w-full"
			/>
		</div>
	);
};

export default MainInput;
