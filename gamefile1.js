var canvas,width,height,x_speed=3,angle=Math.PI/3,y_speed=-5,ball=new Object(),paddle=new Object(),left_arrow=false,right_arrow=false;
var BrickArray=[],BrickRows,BrickColumns;
function bricks_Create()
{
var brickWidth=paddle.width;
var brickHeight=paddle.height;
var horz_spacing=brickWidth/10;
var vert_spacing=brickHeight/10;
BrickRows=5;
BrickColumns=width/(brickWidth+horz_spacing);
for(var i=0;i<BrickColumns;i++)
{
	BrickArray[i]=[];
	for(var j=0;j<BrickRows;j++)
	{
	BrickArray[i][j]=new Object();
	BrickArray[i][j].width=brickWidth;
	BrickArray[i][j].height=brickHeight;
	BrickArray[i][j].X=i*(brickWidth+vert_spacing);
	BrickArray[i][j].Y=j*(brickHeight+horz_spacing);
	BrickArray[i][j].state=true;
	}	
}
}
function canvas_create()
{
width=0.98*window.innerWidth;
height=0.98*window.innerHeight;
canvas=document.querySelector("#arkanoid");
canvas.width=width;
canvas.height=height;
ctx=canvas.getContext("2d");
ball.radius=25;
ball.x=width/2;
ball.y=0.8*height;
paddle.width=100;
paddle.height=30;
paddle.y=0.8*height+ball.radius;
paddle.start_point=width/2;
bricks_Create();
requestAnimationFrame(draw);
}
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
function keyDownHandler(e) {
    if(e.keyCode == 39) {
        right_arrow = true;
    }
    else if(e.keyCode == 37) {
        left_arrow = true;
    }
}
function keyUpHandler(e) {
    if(e.keyCode == 39) {
        right_arrow = false;
    }
    else if(e.keyCode == 37) {
        left_arrow = false;
    }
}
function draw_ball()
{
ctx.save();
ctx.strokeStyle='silver';
ctx.beginPath();
ctx.arc(ball.x,ball.y,ball.radius,0,2*Math.PI);
ctx.fillStyle="orange";
ctx.stroke();
ctx.fill();
ctx.closePath();
ctx.restore();
}
function draw_paddle()
{
ctx.save();
ctx.strokeStyle='red';
ctx.beginPath();
ctx.fillStyle='gold';
ctx.fillRect(paddle.start_point,paddle.y,paddle.width,paddle.height);
ctx.closePath();
ctx.restore();
}
function draw_bricks()
{
	var counter=0;
	ctx.save();
	ctx.strokeStyle='green';
	ctx.fillStyle='white';
	ctx.beginPath();
	for(var i=0;i<BrickColumns;i++)
	{
		for(var j=0;j<BrickRows;j++)
		{
			if(BrickArray[i][j].state==true)
			{
			ctx.fillRect(BrickArray[i][j].X,BrickArray[i][j].Y,BrickArray[i][j].width,BrickArray[i][j].height);
			}
		}
	}
	ctx.closePath();
	ctx.restore();
}
function DetectBricks()
{
	var temp,flag=0;
	for(var i=0;i<BrickColumns;i++)
	{
		for(var j=0;j<BrickRows;j++)
		{
			temp=BrickArray[i][j];
			if(temp.state==true)
			{
			if(ball.x>=temp.X & ball.x<=temp.X+temp.width & ball.y>=temp.Y &ball.y<=temp.Y+temp.height)
			{
				y_speed=-y_speed;
				if(y_speed>=0)
				{
					y_speed+=1;
				}
				BrickArray[i][j].state=false;
				flag=1;
				break;
			}
			if(flag==1)
			{
				break;
			}
			}
		}
	}
}
function draw()
{
	ctx.clearRect(0,0,width,height);
	draw_ball();
	draw_paddle();
	draw_bricks();
	DetectBricks();
if(ball.x+ball.radius>=width || ball.x-ball.radius<=0)
{
	x_speed=-x_speed;
}
if(ball.y-ball.radius<=0||(ball.x+ball.radius>=paddle.start_point & ball.x+ball.radius<=paddle.start_point+paddle.width & y_speed>0 & ball.y+ball.radius>=paddle.y))
{
	y_speed=-y_speed;
}
else if(ball.x-ball.radius>=paddle.start_point & ball.x-ball.radius<=paddle.start_point+paddle.width & ball.y+ball.radius>=paddle.y)
{
	y_speed=-y_speed;
}
if(ball.y+ball.radius>=height)
{
	alert('You lost!');
	exit(1);
}
ball.x+=x_speed*Math.cos(angle);
ball.y+=y_speed*Math.sin(angle);
if(right_arrow & paddle.start_point+paddle.width<=width)
{
	paddle.start_point+=5;
}
if(left_arrow & paddle.start_point>0)
{
	paddle.start_point-=5;
}
requestAnimationFrame(draw);
}
canvas_create();