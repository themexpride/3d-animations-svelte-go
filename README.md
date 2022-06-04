
# 3D Animations on Svelte and Go Fiber

This is a project that focuses on using [Go Fiber](https://docs.gofiber.io/), [Svelthree](https://svelthree.dev/), [Three.js](https://threejs.org/), 
and [Svelte-Cubed](https://github.com/Rich-Harris/svelte-cubed?ref=madewithsvelte.com) to deliver a website that can run multiple simultaneous 3D animations running at once in an efficient setup. Both Svelte and Go Fiber are designed to deliver web applications with efficiency in mind.

I also used some 3D animations that you can go over in the [3D animations section](# 3D Animations)


## Get started

To begin, make sure you're running [Node.js](https://nodejs.org) 16.7+, latest version of [Go Fiber](https://docs.gofiber.io/), and [Go](https://go.dev/) 1.14+.

Go to your top-level folder...
 ```bash
 cd <folder>
 ```

Install the dependencies...
```bash
npm install
```

... edit the Three.js ```package.json``` file in ```node_modules/three/package.json``` to export the file ...
```js
"exports": {
	".": {
	"import": "./build/three.module.js",
	"require": "./build/three.cjs"
	},
	"./examples/fonts/*": "./examples/fonts/*",
	"./examples/jsm/*": "./examples/jsm/*",
	"./src/*": "./src/*",
	// add this
	"./package.json": "./package.json",
},
```

...then start [Rollup](https://rollupjs.org) alongside [Go Fiber](https://docs.gofiber.io/)

```bash
npm run build && go run .
```

Navigate to the local site generated by [Go Fiber](http://127.0.0.1:3000). You should see your app running. 

Recommended to end the running program if you change any component in your code.

## Deploying to the web

I don't recommend any web deployment unless your system can handle the memory usage it needs. I tested it with my system and from my results, you need more than 8GB.

# Frameworks Used

## Svelte template

I used one of the provided [Svelte templates](https://github.com/sveltejs/template) to start the frontend-side of the project. 
```bash
npx degit sveltejs/template .
```
Although the repository is not maintained by the Svelte team anymore, it worked to setup the entire environment needed to run these 3D animations that used different types of libraries.

## Go Fiber - HTML Template

Go Fiber provides [Template interfaces](https://docs.gofiber.io/guide/templates) to run our template engine.

Our template engine, provided by Go Fiber, will render the HTML files in our ```templates``` folder. 
```go
engine := html.New("./templates", ".html")
```

From here, we can build the Fiber instance with its ```Views``` engine that will help our template engine render our HTML files.
```go
app := fiber.New(fiber.Config{
	Views: engine, //set as render engine
})
```
# Key Components

## main.go

In my ```main.go``` file, I decided to use [Go Fiber](https://docs.gofiber.io/) as my main web framework. It would allow me to host the 3D animations through a website. 

I needed to setup a ```go.mod``` file to call all the Go packages needed to run Go Fiber.

I also needed to setup a ```go.sum``` file to do a checksum on the packages used and avoid installing the packages again.

The specified Go packages in my ```main.go``` file were:
```
"time"
"github.com/gofiber/fiber/v2"
"github.com/gofiber/template/html"
```

### app.Static()
```go
app.Static("/public", "./public")
```
This allows our website to be able to access the ```public``` folder on our server. I didn't push the ```public``` folder on this repository due to its size. However, my template HTML file can be customized directly with a ```global.css``` file from that folder.

### app.Get()
```go
app.Get("/", mainPage)
```
A GET handler that returns the template HTML file with the 3D animations compiled in a single JS file using the ```mainpage``` function.

```go
app.Get("/time", func(c *fiber.Ctx) error {
		dt := time.Now()
		return c.SendString(dt.String())
})
```
With the help of the ```time``` Go package, we can get the latest time with this GET handler.

### app.Listen()
```go
app.Listen(":3000")
```
Once the entire web framework is set, we can start listening for any requests. 

### func mainpage()
```go
func mainPage(c *fiber.Ctx) error {
	return c.Render("mainpage", nil)
}
``` 
Function will render the ```mainpage.html``` file with the help of the template render engine we set up and return it through a GET request.

## src/main.ts
```ts
import App from './App.svelte';

const app = new App({
	target: document.getElementById('app'),
	props: {
		name: 'world'
	}
});


export default app;
```
This Typescript file serves to generate the ```App.svelte``` file, with its components, on the ```templates/mainpage.html``` file. It targets the ```<body id="app">``` tag and genereates the ```App.svelte``` file within that tag. We make sure we export the ```app``` variable on the Typescript file.

## src/svelthree.mjs
A bundled and minified version of (svelthree)[https://unpkg.com/svelthree@latest/dist/svelthree.mjs] that is used in some of the 3D animations. 

Setting the animations that required this file was very difficult since not all components were available through other Node.js libraries. I saved the file on my ```src``` folder to be able to run some of the 3D animations.

## public/global.css
We use a CSS file to style the entire site as well as change some key components provided by the respective Svelte libraries. I made sure to remove certain components given, by default, by the Svelte packages. Some of the important components include

### ```.container```
Used for all of our 3D animations to be able to use the full width of the screen.
```css
.container {
	display: relative;
	width: 100%;
}
```

### ```svg[role=img]``` & ```svg[class*="svelte"]``` & ```[class*="svelte"] path```
Used to remove some SVG drawings and other unneccessary animations generated by a Svelte package.
```css
svg[role=img] {
	display: none;
}

svg[class*="svelte"] {
	display: none;
}

[class*="svelte"] path {
	display: none;
}
```

## rollup.config.js
[Rollup](https://rollupjs.org) serves to compile our ```src``` folder that contains all of our Svelte, JavaScript, and TypeScript code and bundles it into a single minified JavaScript file. It was provided with the Svelte template.

We need lots of Node.js libraries to be able to compile all these different file types together.

### export default
```js
export default {
	input: 'src/main.ts',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/build/bundle.js'
	},
	plugins: [
		svelte({
			preprocess: sveltePreprocess({ sourceMap: !production }),
			compilerOptions: {
				// enable run-time checks when not in production
				dev: !production,
			}, 
		}),
		// we'll extract any component CSS out into
		// a separate file - better for performance
		css({ output: 'bundle.css' }),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),
		typescript({
			sourceMap: !production,
			inlineSources: !production
		}),

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		//!production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};
```
For this section, I will focus a little on how Rollup compiles the ```src``` folder.

#### Input
The first important part is to setup the input file provided by ```src/main.ts```. 
```js
input: 'src/main.ts'
```
Since most of our files are setup on ```src/App.svelte```, we only need to import that file to the input file. The rest of the input code will be taken into account by the compiler.

#### Output
We need to output the compiled code to a file. I setup the output file as ```public/build/bundle.js``` since I didn't want to upload the file to Github. 
```js
output: {
	sourcemap: true,
	format: 'iife',
	name: 'app',
	file: 'public/build/bundle.js'
}
```
I generated a ```sourcemap``` for my compiled JS file for debugging purposes. Personally, haven't used it but can be useful for future development.

#### Plugins
Rollup uses [plugins](https://rollupjs.org/guide/en/#using-plugins) to have more flexibility with our work environment that we'll compile. They will help the compiler change certain behaviors at some key points of the bundling process.
```js
plugins: [
	svelte({
		preprocess: sveltePreprocess({ sourceMap: !production }),
		compilerOptions: {
			// enable run-time checks when not in production
			dev: !production,
		}, 
	}),
	// we'll extract any component CSS out into
	// a separate file - better for performance
	css({ output: 'bundle.css' }),

	// If you have external dependencies installed from
	// npm, you'll most likely need these plugins. In
	// some cases you'll need additional configuration -
	// consult the documentation for details:
	// https://github.com/rollup/plugins/tree/master/packages/commonjs
	resolve({
		browser: true,
		dedupe: ['svelte']
	}),
	commonjs(),
	typescript({
		sourceMap: !production,
		inlineSources: !production
	}),

	// In dev mode, call `npm run start` once
	// the bundle has been generated
	//!production && serve(),

	// Watch the `public` directory and refresh the
	// browser on changes when not in production
	!production && livereload('public'),

	// If we're building for production (npm run build
	// instead of npm run dev), minify
	production && terser()
],
```

#### Plugin - Svelte
This plugin is in charge of handling our Svelte code.
```js
svelte({
	preprocess: sveltePreprocess({ sourceMap: !production }),
	compilerOptions: {
		// enable run-time checks when not in production
		dev: !production,
	}, 
})
```

#### Plugin - CSS
This plugin is to remove the CSS styling from our files to bundle it seperately. It helps with performance according to Svelte template.
```js
css({ output: 'bundle.css' })
```

#### Plugin - Resolve
This plugin is to handle the external dependencies installed from npm, which is how we install Node.js modules. 
```js
resolve({
	browser: true,
	dedupe: ['svelte']
})
```

#### Plugin - CommonJS
This plugin is to convert CommonJS modules to ES6 in order to include them in a Rollup bundle.
```js
commonjs()
```

#### Plugin - Typescript
This plugin is used to integrate Typescript code for the compiler. For my settings, I decided not to generate any sourcemaps when we ran ```npm run build```. I also didn't allow the compiler to use any inline sources for the previous command as well.
```js
typescript({
	sourceMap: !production,
	inlineSources: !production
})
```

#### When not running ```npm run build```
If we want to refresh the browser on any changes done to the ```public``` folder, then we enable the ```livereload``` for that folder.
```js
!production && livereload('public')
```

#### When we **actually** run ```npm run build```
When we're set to build for production, we can minify the compiled code using ```terser```.
```js
production && terser()
```

#### Watch
The screen will not be cleared when a rebuild of your bundle is triggered by any module changes. This is provided by the Svelte template.
```js
watch: {
	clearScreen: false
}
```

 # 3D Animations
 For many of these animations, I found the ones compatible with Svelte. During my research, I discovered multiple projects working to deliver 3D Animations on Svelte. Not all of them share the same libraries, even though they use very similar components. In some of them, they used the [Three.js](https://threejs.org/) library and [Svelte-Cubed](https://svelte-cubed.vercel.app/) library. In others, they used the [Svelthree](https://svelthree.dev/) library. Most of these files are ```.svelte``` files with a couple of additional ```.js``` files.
 
 ## Trisolaris
 This animation is provided by the [Three.js](https://threejs.org/) library and [Svelte-Cubed](https://svelte-cubed.vercel.app/) library. You can check the animation on the [Svelte-Cube website](https://svelte-cubed.vercel.app/examples/trisolaris). 
 
 The animation is a bunch of stars stored inside a 3D cube that move around with Physics. It came with different JavaScript files to incorporate the movement and other features.
 
 I also incorporated the knobs used to control the 3D animation. I had to remove multiple aspects of the code including certain images and drawings that were attached to the animation. 
 ![image](https://user-images.githubusercontent.com/59406376/171965738-e3a96191-4b8a-4802-ad95-f7790ba80ea1.png)

## Octahedron 
This 3D animation was the first one I tested out. I referenced this [Dev.to tutorial](https://dev.to/alexwarnes/svelte-cubed-an-introduction-to-3d-in-the-browser-1ea3) to implement the animation. It uses the [Three.js](https://threejs.org/) library and [Svelte-Cubed](https://svelte-cubed.vercel.app/) library. You can check the animation on the tutorial's [Svelte REPL](https://svelte.dev/repl/71b063fc410543598e8a727999cf7bbe)

The animation is a simple Octahedron you can interact with by moving it around.

I decided to remove the styling from the ```App.svelte``` file and changed it to the ```public/global.css``` file. 
![image](https://user-images.githubusercontent.com/59406376/171966056-95f7d961-b2be-4498-98ec-c8201f287487.png)

## Grouping Mesh components
This 3D animation used a different library than the previous animations. For this animation, we needed to save the [Svelthree MJS file](https://unpkg.com/svelthree@latest/dist/svelthree.mjs) and keep it in our ```src``` file since we can't compile the Svelte file with a link. We can still access it on [Svelthree.dev](https://svelthree.dev/examples#grouping-reusable-mesh-components).

The animation displays multiple mesh components grouped that floats and turns. This is the only non-interactible 3D animation in this project.
![image](https://user-images.githubusercontent.com/59406376/171967126-b5c6059b-0ac8-4d9d-a16f-626a8e1ad9c2.png)


## Cube
We use the same [Svelthree MJS file](https://unpkg.com/svelthree@latest/dist/svelthree.mjs) to run this animation and use it the same way as the [Grouping Mesh components](# Grouping Mesh components) example. The example is also provided on [Svelthree.dev](https://svelthree.dev/examples#interactive). 

The animation is a simple interactive 3D cube that follows your cursor and when you click it, it expands!
![image](https://user-images.githubusercontent.com/59406376/171967149-9ce31281-d717-491a-9603-907f89718933.png)
 
 # Issues
 
 ## Environment Setup
 My main struggle was to incorporate both sets of libraries to work with all these 3D animations. Both didn't want to work when I attempted to install all libraries through [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/). I tried different combinations, but due to the complexity of the environment, I decided to install most of my libraries through [npm](https://www.npmjs.com/) and download the [Svelthree](https://svelthree.dev/) library directly to my ```src``` folder. 
 
 ## Go Fiber incorporation
 Another issue revolved the incorporation of Go Fiber. I thought about separating the animations to seperate HTML sites, but my ```src/main.ts``` file failed to render the animations separately. This is something I wished to fix, but due to time constraints, I wasn't able to accomplish it before my due date. I managed to setup the ```main.go``` file in a simple manner where I incorporate the template render engine to render the HTML files with the compiled 3D animations called by the ```public/build/bundle.js``` file. 
 
 ## Memory Usage
 This project consumed lots of resourced to compute the simultaneous 3D animations. Even if this built was designed with efficiency in mind, there's limitations on what we can restrict in our animations. I haven't tested my setup to see if using less animations helps and if so, which ones are the most efficient to keep. 
 
 I also discovered that rendering the Trisolaris example found on [Svelte-Cubed](https://svelte-cubed.vercel.app/examples/trisolaris) on a slow PC is barely functional and slow. It's important to have an up-to-date build with decent specs to be able to run at least one 3D animation.
 
 
 
 
 
 
 
 

