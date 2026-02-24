import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Input } from "./components/input";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "./components/ui/card";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

function App() {
	const [name, setName] = useState<string>(
		() => localStorage.getItem("name") ?? "",
	);
	const [email, setEmail] = useState<string>(
		() => localStorage.getItem("email") ?? "",
	);
	const [isDark, setIsDark] = useState<boolean>(() => {
		const savedTheme = localStorage.getItem("isDark");
		return savedTheme !== null ? JSON.parse(savedTheme) : true;
	});
	const [status, setStatus] = useState("");

	useEffect(() => {
		localStorage.setItem("isDark", JSON.stringify(isDark));
		if (isDark) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}, [isDark]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setStatus("Sent!");
		setTimeout(() => setStatus(""), 3000);
	};

	const handleClear = () => {
		setName("");
		setEmail("");
		localStorage.removeItem("name");
		localStorage.removeItem("email");
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background text-foreground transition-colors">
			<button
				onClick={() => setIsDark(!isDark)}
				className="mb-8 px-4 py-2 border rounded hover:bg-accent transition-colors"
			>
				{isDark ? "Light" : "Dark"} Mode
			</button>

			<Card className="w-full max-w-sm shadow-lg">
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						Notandi: {name || "..."}
						<Badge variant="outline">Innskráning</Badge>
					</CardTitle>
					<CardDescription>
						{email ? `Netfang: ${email}` : "Vinsamlegast fylltu út formið"}
					</CardDescription>
				</CardHeader>

				<CardContent>
					<form id="user-form" onSubmit={handleSubmit} className="space-y-4">
						<div className="space-y-2">
							<label className="text-sm font-medium">Nafn</label>
							<Input
								type="text"
								placeholder="Skrifaðu nafn..."
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</div>

						<div className="space-y-2">
							<label className="text-sm font-medium">Netfang</label>
							<Input
								type="email"
								placeholder="netfang@skoli.is"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
					</form>
				</CardContent>

				<CardFooter className="flex flex-col items-start gap-4">
					<Button
						form="user-form"
						type="submit"
						variant="outline"
						className="w-full hover:opacity-90 transition-all"
					>
						Senda upplýsingar
					</Button>
					<AlertDialog>
						<AlertDialogTrigger asChild>
							<Button variant="outline" className="w-full">
								Hreinsa form
							</Button>
						</AlertDialogTrigger>

						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>Ertu alveg viss?</AlertDialogTitle>
								<AlertDialogDescription>
									Þessi aðgerð mun eyða öllum upplýsingum sem þú hefur skrifað í
									formið og hreinsa minnið.
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>Hætta við</AlertDialogCancel>
								<AlertDialogAction
									onClick={handleClear}
									className="bg-destructive text-destructive-foreground"
								>
									Tortíma upplýsíngum
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
					{status && (
						<p className="text-green-500 font-medium animate-bounce">
							{status}
						</p>
					)}
				</CardFooter>
			</Card>
		</div>
	);
}

export default App;
