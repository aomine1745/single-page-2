// Header | Navigation
// DOM
const header = document.querySelector('header'),
btn = document.querySelector('.btn-toggle'),
navItems = document.querySelector('header nav ul'),
links = document.querySelectorAll('.link'),
sidenavOverlay = document.querySelector('.sidenav-overlay'),
section = document.querySelectorAll('h2'),
main = document.querySelector('main'),
breakpoint = window.matchMedia('screen and (max-width: 767.8px)');
var headerH,
headerHS,
btnClass = 'open',
scrollPosition,
sections = [];

//Load
window.onload = () => {
	headerH = header.offsetHeight;
	main.style.height = (window.innerHeight - headerH)+'px';
	// main.style.height = document.documentElement.clientHeight;

	section.forEach((e, i) => {
		sections[e.id] = e.offsetTop - headerH;
	});
	const mql = e => {
		if (e.matches) {
			headerHS = headerH.toString() + 'px';
			navItems.style.marginTop = headerHS;
			btn.addEventListener('click', btnActive);
			sidenavOverlay.addEventListener('click', removeV);
			for(let i of links){
				i.addEventListener('click',removeV);
			}
		}else{
			navItems.style.marginTop = '0px';
			btn.removeEventListener('click', btnActive);
			sidenavOverlay.removeEventListener('click',removeV);
			for(let i of links){
				i.removeEventListener('click',removeV);
			}
		}
	}

	breakpoint.addListener(mql);
	mql(breakpoint);
}

function btnActive(){
	if (this.classList.contains('open')) {
		this.classList.remove(btnClass);
		btnClass = 'close';
	} else if (this.classList.contains('close')) {
		this.classList.remove(btnClass);
		btnClass = 'open';
	}

	void this.offsetWidth;
	this.classList.add(btnClass);
}
function removeV(){
	btn.classList.remove(btnClass);
	btnClass = 'close';
	void btn.offsetWidth;
	btn.classList.add(btnClass);
}

//Resize
window.onresize = ()=>{
	headerH = header.offsetHeight;
	main.style.height = (window.innerHeight - headerH)+'px';
	section.forEach((e, i) => {
		sections[e.id] = e.offsetTop - headerH;
	});
}

// ScrollSpy
main.onscroll = () =>{
	scrollPosition = main.scrollTop;
	for (let i in sections) {
		if (sections[i] <= scrollPosition) {
			document.querySelector('.active').classList.remove('active');
			document.querySelector('a[class*=' + i + ']').classList.add('active');
		}
	}
}