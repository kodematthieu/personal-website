<script>
	const bioInfo = {
		name: "",
	};
</script>

<section id="about-me" style="height: calc(100% - 111px);">
	<h1>About Me</h1>
	<div class="about-content">
		<p>
			Hi, I'm Karel Matthieu L. Logro, an 18-year-old student with a deep
			passion for programming. My journey began at the age of 11 when I
			started learning to code on my smartphone. Over the years,
			programming has evolved from a hobby into a significant part of my
			life.
		</p>
		<p>
			I've learned a variety of programming languages, starting with
			JavaScript and progressing through Java, Python, C, C++, Rust, and
			Dart. The order in which I learned them is: JavaScript &gt; Java
			&gt; Python &gt; C &gt; C++ &gt; Rust &gt; Dart.
		</p>
		<p>
			Currently, I'm particularly interested in systems programming using
			Rust. I enjoy tackling complex technical challenges and developing
			innovative solutions, showcasing my proficiency in multiple
			programming languages and algorithms.
		</p>
		<p>
			In addition to my programming skills, I excel in physics and
			chemistry, demonstrating a deep understanding and enthusiasm for
			these subjects. My dedication to my studies is evident through my
			active participation and outstanding performance in class.
		</p>
		<p>
			Looking ahead, I aim to deepen my knowledge in systems programming
			and contribute to open-source projects in Rust. My ultimate goal is
			to become a leading expert in software engineering, using innovative
			technology to solve real-world problems.
		</p>
	</div>
</section>
<div class="divider"></div>
<footer>
	<div class="group">
		<p>
			Designed & Developed with <a href="https://astro.build/">Astro</a>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="1em"
				height="1em"
				viewBox="0 0 32 32"
				><path
					fill="url(#vscodeIconsFileTypeAstro0)"
					d="M11.025 20.499c-.532 1.75-.154 4.184 1.105 5.331v-.042l.042-.112c.154-.741.756-1.203 1.526-1.175c.713.014 1.12.392 1.217 1.217c.042.308.042.616.056.938v.098c0 .7.196 1.371.588 1.959c.35.56.84.993 1.497 1.287l-.028-.056l-.028-.112c-.49-1.469-.14-2.49 1.147-3.358l.392-.266l.868-.573a4.25 4.25 0 0 0 1.791-3.037c.07-.532 0-1.05-.154-1.553l-.21.14c-1.945 1.035-4.17 1.4-6.325.98c-1.301-.197-2.56-.56-3.498-1.652z"
				/><path
					fill="#fff"
					d="M4.925 20.191s3.736-1.82 7.486-1.82l2.84-8.759c.098-.42.406-.7.756-.7s.644.28.756.714l2.826 8.746c4.45 0 7.487 1.82 7.487 1.82L20.709 2.84c-.168-.518-.49-.84-.896-.84h-7.612c-.406 0-.7.322-.896.84z"
				/><defs
					><linearGradient
						id="vscodeIconsFileTypeAstro0"
						x1="8.19"
						x2="16.91"
						y1="23"
						y2="18.89"
						gradientTransform="translate(-.673 -2.198)scale(1.3993)"
						gradientUnits="userSpaceOnUse"
						><stop offset="0" stop-color="#d83333" /><stop
							offset="1"
							stop-color="#f041ff"
						/></linearGradient
					></defs
				></svg
			>
		</p>
		<p>&copy; {new Date().getFullYear()} KodeMat</p>
	</div>
	<p class="socials">
		<a href="https://github.com/kodematthieu">GitHub</a>
	</p>
</footer>

<style lang="scss">
	section {
		padding: 40px 40px 0;
		font-family: "Lexend";
	}
	h1 {
		font-size: 16px;
		text-align: left;
		text-transform: uppercase;
		font-family: "Outfit";
	}
	.about-content {
		@media (min-width: 600px) {
			padding: 0 50px;
		}
		> p {
			text-indent: 2em;
			font-size: 10px;
			text-align: left;
			line-height: 1.6;
			margin-top: 10px;

			@media (min-width: 600px) {
				font-size: 14px;
			}
			@media (min-width: 1000px) {
				font-size: 16px;
			}
		}
	}
	.divider {
		width: 85%;
		margin: 5px 7.5%;
		border: 0.5px solid #fff;
	}
	footer {
		height: 100px;
		padding: 0 7.5%;
		font-size: 12px;
		> .group > p > svg {
			display: inline;
			font-size: 14px;
		}
	}
</style>
