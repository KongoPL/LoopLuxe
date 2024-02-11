import React from "react"
import { Header } from "./Header"

export const Layout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
	return <>
		<Header />
		<div className="container">
			{children}
		</div>
		<footer>
			&copy; LoopLuxe 2024
		</footer>
	</>
}
