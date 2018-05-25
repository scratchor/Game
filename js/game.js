	
function playGame() {
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	var body_style = getComputedStyle(document.body);
	var html_style = getComputedStyle(document.documentElement);
	var bodyW = body_style.width;
	var bodyH = body_style.height;

	console.log(bodyW);
	console.log(bodyH);
	console.dir(canvas.style.width);
	
	
	canvas.style.width = "1000px"; //ширина canvas
	console.dir(canvas.style.width);
	//var canvasW = parseInt(canvas.style.width);
	canvas.style.height = "550px";
	//var canvasH = parseInt(canvas.style.height);//высота canvas
	canvas.width = parseInt(canvas.style.width);
	var canvasW = canvas.width;
	canvas.height = parseInt(canvas.style.height);
	var canvasH = canvas.height;
	var W = canvas.width;
	var H = canvas.height;
	console.dir(canvas);
	console.log(canvas.height);
	console.log(canvas.width);
	console.dir(canvas.style.height);
	console.dir(canvas.style.width);
	var shipH = canvasH/25;
	var shipW = canvasW/30;
	var norma = 30;
	var triTopY = canvasH - shipH - norma;
	var triTopX = canvasW/2;
	var warSpeed = 5;
	var angle;
	var coordX1;
	var coordY1;
	var coordX2;
	var coordY2;
	var coordX3;
	var coordY3;
	var coordX4;
	var coordY4;
	var NewTriTopX //= canvasW/2;
	var NewTriTopY //= canvasH - shipH - norma;
	var angle2;
	var mp = 8; //max particles
	var particles = [];
	var rightPressed = false;
	var leftPressed = false;
	var bottomPressed = false;
	var upPressed = false;	
	var bombAngle = 0;
	var collision = false;
	var lives = 3;
	var masColl = [];
	var bullets = [];
	var allLives = 0;

	
	
	
	//View
	function draw() {	
	    ctx.clearRect(0, 0, canvasW, canvasH);
		drawWarship();
		drawBombs();
		drawBulltes();
		checkCollision();
		countLife();
		checkHit();
		wievScore();
		checkCancel();
		
		
	}
	
	
	
	function wievScore() {
		let lives = document.getElementById("lives");
		lives.textContent = "lives: " + allLives;
	}
	
	//Model
	
	document.addEventListener("keydown", keyDownHandler, false);
	document.addEventListener("keyup", keyUpHandler, false);
	document.addEventListener("mousemove", mouseMoveHandler, false);
	document.addEventListener("click", mouseClickHandler, false);
		
	
		function keyDownHandler(e) {
		if(e.keyCode == 39) {
			rightPressed = true;
		} else if(e.keyCode === 40) {
			bottomPressed = true;
		} else if(e.keyCode == 37) {
			leftPressed = true;
		} else if(e.keyCode === 38) {
			upPressed = true;
		} else if(e.keyCode === 27) {
			cancel = true;
		}	
	};
	
	function keyUpHandler(e) {
		if(e.keyCode == 39) {
			rightPressed = false;
		} else if(e.keyCode === 40) {
			bottomPressed = false;
		} else if(e.keyCode == 37) {
			leftPressed = false;
		} else if(e.keyCode === 38) {
			upPressed = false;
		} else if(e.keyCode === 27) {
			cancel = false;
		}	
	};
	
	
	
	
		function drawWarship() {
			if (rightPressed && NewTriTopX + shipW + warSpeed + norma < canvas.width) {
				triTopX += warSpeed;
			} else if(leftPressed && NewTriTopX - shipW - warSpeed - norma> 0) {
				triTopX -= warSpeed;
			} else if(bottomPressed && NewTriTopY + shipH + warSpeed < canvas.height - norma + 15) {
					triTopY += warSpeed;
			} else if(upPressed && NewTriTopY - warSpeed - norma > 0) {
				triTopY -= warSpeed;
			}
			
			
		if(angle2 === angle) {
				if(!angle) {
					angle = 0;
				}
			if(angle > 0) {
					NewTriTopX = triTopX - (angle * shipW) + shipH/3 * (angle);
					NewTriTopY = triTopY + (angle * shipH);
					coordX1 = triTopX - shipW + (angle * shipW) - (1-angle) * (angle * shipH);
					coordY1 = triTopY + shipH + (angle * shipH) + (1-angle) * (angle * shipW);
					coordX2 = triTopX + shipW - (angle * shipW) + (1-angle) * (angle * shipH);
					coordY2 = triTopY + shipH - (angle * shipH) - (1-angle) * (angle * shipW);
					coordX3 = triTopX - shipW + (angle * shipW) - (1-angle) * (angle * shipH) - shipH/2*angle;				
					coordY3 = triTopY + shipH + (angle * shipH) + (1-angle) * (angle * shipW) - shipH/2*(1-angle);
					coordX4 = triTopX + shipW - (angle * shipW) + (1-angle) * (angle * shipH) - shipH/2*angle;
					coordY4 = triTopY + shipH - (angle * shipH) - (1-angle) * (angle * shipW) - shipH/2*(1-angle);
				} else {
					NewTriTopX = triTopX - (angle * shipW) + shipH/3 * (angle);
					NewTriTopY = triTopY - (angle * shipH);
					coordX1 = triTopX - shipW - (angle * shipW) + (1+angle) * (angle * shipH);
					coordY1 = triTopY + shipH + (angle * shipH) + (1+angle) * (angle * shipW);
					coordX2 = triTopX + shipW + (angle * shipW) - (1+angle) * (angle * shipH);
					coordY2 = triTopY + shipH - (angle * shipH) - (1+angle) * (angle * shipW);
					coordX3 = triTopX - shipW - (angle * shipW) + (1+angle) * (angle * shipH) - shipH/2*(angle);				
					coordY3 = triTopY + shipH + (angle * shipH) + (1+angle) * (angle * shipW) - shipH/2*(1+angle);
					coordX4 = triTopX + shipW + (angle * shipW) - (1+angle) * (angle * shipH) - shipH/2*angle;
					coordY4 = triTopY + shipH - (angle * shipH) - (1+angle) * (angle * shipW) - shipH/2*(1+angle);				
				}
				
			

		};
			angle2 = angle;
			
			ctx.beginPath();
			ctx.moveTo(NewTriTopX, NewTriTopY);
			ctx.lineTo(coordX1, coordY1);
			//ctx.lineTo(coordX3, coordY3);
			//ctx.moveTo(coordX1, coordY1);
			ctx.lineTo(coordX2, coordY2);
			ctx.fill();
			//ctx.stroke();
			ctx.moveTo(coordX1, coordY1);
			ctx.lineTo(coordX3, coordY3);
			ctx.stroke();
			ctx.moveTo(coordX2, coordY2);
			ctx.lineTo(coordX4, coordY4);
			ctx.stroke();
			
		}
	

	function mouseMoveHandler(e) {
		var relativeY = e.clientY - canvas.offsetTop;
		var relativeX = e.clientX - canvas.offsetLeft;
		if(relativeX > 0 && relativeX < canvas.width && relativeY > 0 && relativeY < canvas.height) {
			var catet1 = triTopX - relativeX;
			var catet2 = triTopY + shipH - relativeY;
			var gipot = Math.sqrt(catet1**2 + catet2**2);
			angle = catet1/gipot;
			if (angle) {
				if(angle > 0) {
					NewTriTopX = triTopX - (angle * shipW) + shipH/3 * (angle);
					NewTriTopY = triTopY + (angle * shipH);
					coordX1 = triTopX - shipW + (angle * shipW) - (1-angle) * (angle * shipH);
					coordY1 = triTopY + shipH + (angle * shipH) + (1-angle) * (angle * shipW);
					coordX2 = triTopX + shipW - (angle * shipW) + (1-angle) * (angle * shipH);
					coordY2 = triTopY + shipH - (angle * shipH) - (1-angle) * (angle * shipW);
					coordX3 = triTopX - shipW + (angle * shipW) - (1-angle) * (angle * shipH) - shipH/2*angle;				
					coordY3 = triTopY + shipH + (angle * shipH) + (1-angle) * (angle * shipW) - shipH/2*(1-angle);
					coordX4 = triTopX + shipW - (angle * shipW) + (1-angle) * (angle * shipH) - shipH/2*angle;
					coordY4 = triTopY + shipH - (angle * shipH) - (1-angle) * (angle * shipW) - shipH/2*(1-angle);
				} else {
					NewTriTopX = triTopX - (angle * shipW) + shipH/3 * (angle);
					NewTriTopY = triTopY - (angle * shipH);
					coordX1 = triTopX - shipW - (angle * shipW) + (1+angle) * (angle * shipH);
					coordY1 = triTopY + shipH + (angle * shipH) + (1+angle) * (angle * shipW);
					coordX2 = triTopX + shipW + (angle * shipW) - (1+angle) * (angle * shipH);
					coordY2 = triTopY + shipH - (angle * shipH) - (1+angle) * (angle * shipW);
					coordX3 = triTopX - shipW - (angle * shipW) + (1+angle) * (angle * shipH) - shipH/2*(angle);				
					coordY3 = triTopY + shipH + (angle * shipH) + (1+angle) * (angle * shipW) - shipH/2*(1+angle);
					coordX4 = triTopX + shipW + (angle * shipW) - (1+angle) * (angle * shipH) - shipH/2*angle;
					coordY4 = triTopY + shipH - (angle * shipH) - (1+angle) * (angle * shipW) - shipH/2*(1+angle);				
				}
			}
			
						
		}
	};	
	
	
	
	
	
	//массив с бомбами
	for(var i = 0; i < mp; i++)  {
		particles.push({
			x: Math.random()*W, //x-coordinate
			y: Math.random()*H, //y-coordinate
			r: Math.random()*10+15, //radius
			d: Math.random()*mp //density
		})
	};
	
	
	
	
	function drawBombs() {
		ctx.beginPath();
		for(var i = 0; i < mp; i++) {
			var p = particles[i];
			ctx.moveTo(p.x, p.y);
			ctx.arc(p.x, p.y, p.r, 0, Math.PI*2, true);
		};
		ctx.fill();
		update();
	};
	
	
	
	
	function update() {
		bombAngle += 0.01;
		for(var i = 0; i < mp; i++)
		{
			var p = particles[i];
			//Updating X and Y coordinates
			//We will add 1 to the cos function to prevent negative values which will lead flakes to move upwards
			//Every particle has its own density which can be used to make the downward movement different for each flake
			//Lets make it more random by adding in the radius
			p.y += Math.cos(angle+p.d/2) + 1;
			p.x += Math.sin(bombAngle) * 2;
			
			//Sending flakes back from the top when it exits
			//Lets make it a bit more organic and let flakes enter from the left and right also.
			if(p.x > W+5 || p.x < -5 || p.y > H)
			{
				if(i%3 > 0) //66.67% of the flakes
				{
					particles[i] = {x: Math.random()*W, y: -10, r: p.r, d: p.d};
				}
				else
				{
					//If the flake is exitting from the right
					if(Math.sin(bombAngle) > 0)
					{
						//Enter from the left
						particles[i] = {x: -5, y: Math.random()*H, r: p.r, d: p.d};
					}
					else
					{
						//Enter from the right
						particles[i] = {x: W+5, y: Math.random()*H, r: p.r, d: p.d};
					}
				}
			}
		}
	}
	
	
		
	function checkCollision() {
		var coords = [{x: NewTriTopX, y: NewTriTopY},{x: coordX1, y: coordY1},{x: coordX2, y: coordY2},
				{x: coordX3, y: coordY3},{x: coordX4, y: coordY4}];
		for(var i = 0; i < coords.length; i++) {
			var c = coords[i];
			for(var j = 0; j < mp; j++) {
				var p = particles[j];
				if(Math.sqrt((p.x - c.x)**2 + (p.y - c.y)**2) < p.r) {
				let check;
					for(let k = 0; k <= masColl.length; k++) {
						if(masColl[k] === j) {
							check = true;
							break;
						}
					}	
						if(!check) {
							collision = true;
							masColl.push(j);
						}	
					
				
				}
				else {
					for(let k = 0; k < masColl.length; k++) {
						if(masColl[k] === j) {
							if(p.x >= W-10 || p.x <= 10 || p.y >= H-10) {
							masColl.splice(k, 1);
							k--;
							}
						}	
						
					}
				}
			}
		}	
	};
	
	
	
	function countLife() {
		if(collision === true) {
			lives -= 1;
			allLives++;
			collision = false;
		}
		/*if(lives <= 0) {
			alert("The game is over!");
			lives = 3;
		}*/
	}


	function mouseClickHandler () {
		bullets.push({
			x: coordX3, //x-coordinate
			y: coordY3, //y-coordinate
			r: 5,
			a: angle,
		});
		bullets.push({
			x: coordX4, //x-coordinate
			y: coordY4, //y-coordinate
			r: 5,
			a: angle,
		})	
	
	}
	
	

	
	
	function drawBulltes () {
	
		ctx.beginPath();
		for(var i = 0; i < bullets.length; i++) {
			var b = bullets[i];
			ctx.moveTo(b.x, b.y);
			ctx.arc(b.x, b.y, b.r, 0, Math.PI*2, true);
		};		
		ctx.fill();
		updateBullets();
	
	}

	
	function updateBullets () {
		for(var i = 0; i < bullets.length; i++) {
			var b = bullets[i];
			b.x -= 6 * b.a;
			b.y -= 6 * (1 - Math.abs(b.a));
		};
		for(var i = 0; i < bullets.length; i++) {
			var b = bullets[i];
			if(b.x < 0 || b.x > W || b.y < 0) {
				bullets.splice(i, 1);
				i--;
			}
		}
	}
	
	function checkHit () {
		for(var i = 0; i < mp; i++) {
			var p = particles[i];
			for(var j = 0; j < bullets.length; j++) {
				var b = bullets[j];
				if(Math.sqrt((p.x - b.x)**2 + (p.y - b.y)**2) < p.r + b.r) {
					bullets.splice(j, 1);
					j--;
					particles[i] = {x: Math.random() * W, y: -20, r: p.r, d: p.d};
				}
			}
		}
		
		
		
	}
	
	function checkCancel() {
		if(cancel === true) {
			return;
		}
		requestAnimationFrame(draw);
	};
	
	start_Stop = checkCancel;
	
	draw()
	
}