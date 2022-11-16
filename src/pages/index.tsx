import MainLayout from '@/layouts/main';

import Hero from '@/ui/main/hero';
import About from '@/ui/profile/about';
import Tech from '@/ui/main/tech';
import Projects from '@/ui/main/projects';

export default function Home() {
	return (
		<MainLayout>
			<Hero />
			<About />
			<Tech />
			<Projects />
		</MainLayout>
	);
}
