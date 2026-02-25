import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { Switch } from "@/components/ui/switch";
import { Moon, Sun } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
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

	const playWow = useCallback(() => {
		const audio = new Audio("/wow.mp3");
		audio.play().catch(() => {});
	}, []);

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
		playWow();
		toast.success("WOW!", {
			description: `Nice to meet you ${name}`,
		});
	};

	const handleClear = () => {
		playWow();
		setName("");
		setEmail("");
		localStorage.removeItem("name");
		localStorage.removeItem("email");
		toast.error("Fields erased", {
			description: "Wow... it's all gone.",
		});
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background text-foreground transition-colors font-sans">
			<Card className="w-full max-w-sm shadow-2xl border-2 border-primary/20">
				<CardHeader className="flex flex-col items-center text-center">
					<Avatar className="h-24 w-24 mb-4 border-4 border-primary/10 shadow-xl">
						<AvatarImage
							src="/owen.jpg"
							alt="The Wow Man Himself"
							className="object-cover origin-center"
						/>
						<AvatarFallback className="text-xl font-bold">OW</AvatarFallback>
					</Avatar>

					<CardTitle className="flex items-center justify-between w-full">
						<span className="truncate">User: {name || "Stranger"}</span>
						<Badge variant="outline" className="font-black">
							WOW
						</Badge>
					</CardTitle>
					<p className="text-xs italic text-muted-foreground mt-2 px-4">
						"I don't know karate, but I know kar-azy, and I will use it!" — Owen
						Wilson
					</p>
					<CardDescription className="mt-4 border-t pt-2 w-full">
						Fill out the form below to receive a "Wow".
					</CardDescription>
				</CardHeader>

				<CardContent>
					<form id="user-form" onSubmit={handleSubmit} className="space-y-4">
						{/* Nafna-reitur */}
						<div className="space-y-2">
							<label className="text-sm font-bold uppercase tracking-tight">
								Name
							</label>
							<Input
								type="text"
								placeholder="Owen Wilson"
								required
								value={name}
								onChange={(e) => {
									setName(e.target.value);
									if (e.target.value.length > 0) playWow();
								}}
							/>
						</div>

						{/* Email-reitur */}
						<div className="space-y-2">
							<label className="text-sm font-bold uppercase tracking-tight">
								Email
							</label>
							<Input
								type="email"
								placeholder="Owen@Wilson.wow"
								required
								value={email}
								onChange={(e) => {
									setEmail(e.target.value);
									if (e.target.value.length > 0) playWow();
								}}
							/>
						</div>
					</form>
				</CardContent>

				<CardFooter className="flex flex-col gap-4">
					<div className="flex flex-col w-full gap-2">
						<Button
							form="user-form"
							type="submit"
							variant="default"
							className="w-full font-bold uppercase tracking-widest transition-all hover:scale-[1.02]"
						>
							WOW
						</Button>

						<AlertDialog>
							<AlertDialogTrigger asChild>
								<Button
									variant="ghost"
									className="w-full text-xs opacity-50 hover:opacity-100"
									onClick={playWow}
								>
									NOT WOW
								</Button>
							</AlertDialogTrigger>
							<AlertDialogContent>
								<AlertDialogHeader>
									<AlertDialogTitle className="text-2xl font-black">
										WOW.
									</AlertDialogTitle>
									<AlertDialogDescription>
										Are you sure you want to erase everything? That's not very
										wow of you.
									</AlertDialogDescription>
								</AlertDialogHeader>
								<AlertDialogFooter>
									<AlertDialogCancel onClick={playWow}>
										No, wow..
									</AlertDialogCancel>
									<AlertDialogAction
										onClick={handleClear}
										className="bg-destructive hover:bg-destructive/90"
									>
										Yes, Wow!
									</AlertDialogAction>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
					</div>

					<div className="flex items-center justify-center w-full pt-4 border-t border-dashed space-x-4">
						<Sun
							className={`h-5 w-5 transition-all ${!isDark ? "text-yellow-500 scale-125" : "text-muted-foreground"}`}
						/>
						<Switch
							checked={isDark}
							onCheckedChange={(checked) => {
								setIsDark(checked);
								playWow();
							}}
						/>
						<Moon
							className={`h-5 w-5 transition-all ${isDark ? "text-blue-400 scale-125" : "text-muted-foreground"}`}
						/>
					</div>
				</CardFooter>
			</Card>
			<Toaster position="top-center" richColors closeButton />
		</div>
	);
}

export default App;
