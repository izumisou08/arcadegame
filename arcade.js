const player_image = document.createElement('img');
player_image.setAttribute('src', 'player.png');
const player = document.createElement('div');
player.className = 'block player';
player.appendChild(player_image);
console.log(player);

const square_image = document.createElement('img');
square_image.setAttribute('src','squares.png');
const square = document.createElement('div');
square.className = 'block squares';
square.appendChild(square_image);
console.log(square);

const trap_image = document.createElement('img');
trap_image.setAttribute('src','trap.png');
const trap = document.createElement('div');
trap.className = 'block trap';
trap.appendChild(trap_image)
console.log(trap);

const goal_image = document.createElement('img');
goal_image.setAttribute('src','goal.png');
const goal = document.createElement('div');
goal.className = 'block goal';
goal.appendChild(goal_image);
console.log(goal);



let player_position = 1;

const reset_trap = document.querySelectorAll('block trap');
//const reset_trap = document.getElementsByClassName('trap');

const player_move_point_up = -8;
const player_move_point_down = 8;
const player_move_point_right = 1;
const player_move_point_left = -1;

const next_stage = document.getElementById('nextstagebutton');
document.addEventListener('keydown',function(e){
    const block_parents = document.getElementsByClassName("block_parent");
    let last_player_position = player_position;
    

    if(e.code == 'ArrowUp' && player_position > 8){
        movePlayer(block_parents, last_player_position, player_move_point_up);
    }
    else if(e.code == 'ArrowDown' && player_position < 57){
        movePlayer(block_parents, last_player_position, player_move_point_down);
    }
    else if(e.code == 'ArrowRight' &&  player_position % 8 != 0){
        movePlayer(block_parents, last_player_position, player_move_point_right);
    }
    else if(e.code == 'ArrowLeft' && (player_position - 1)% 8 != 0){
        movePlayer(block_parents, last_player_position, player_move_point_left);
    }
    else if(e.code == 'Enter'){
        document.getElementById('nextstagebutton').click();
    }
})

function movePlayer(block_parents, last_player_position, move_player_position_point){
    let clear_flag;
    let last_player_position_element = block_parents[last_player_position-1];
    player_position += move_player_position_point;
    let next_player_position_element = block_parents[player_position-1];
    if(next_player_position_element.children[0].classList.contains('trap')){
        reloadPage();
    }
    if(next_player_position_element.children[0].classList.contains('goal')){
        clear_flag = true;
    }
    console.log(next_player_position_element.children[0].classList.contains('trap'));
    removeAllChild(next_player_position_element);
    let new_player = player.cloneNode(true);
    next_player_position_element.appendChild(new_player);
    next_player_position_element.firstElementChild.setAttribute('id', 'block'+player_position); //playeridou OK
    
    removeAllChild(last_player_position_element);
    let new_square = square.cloneNode(true);
    last_player_position_element.appendChild(new_square);
    last_player_position_element.firstElementChild.setAttribute('id','block'+last_player_position);
    console.log(player_position);
    if(clear_flag){
        const clear = document.getElementById('backcolor');
        console.log(clear);
        //alert("clear");
        // clear = true;
        clear.style.visibility = "visible";
        const next_stage = document.getElementById('nextstagebutton');
        next_stage.disabled = false;
    }
}

function reloadPage(){
    location.reload();
}

function removeAllChild(element){
    while(element.lastChild){
        element.removeChild(element.lastChild);
    }
}

function createStage(){
    const clear = document.getElementById('backcolor');
    clear.style.visibility = "hidden"
    const next_stage = document.getElementById('nextstagebutton');
    next_stage.disabled = true;
    
    const block_parents = document.getElementsByClassName("block_parent");

    console.log(block_parents[1]);
    
    for(let i = 0;i < 64; i++){
        removeAllChild(block_parents[i]);
        if(map[i] == 0){
            let new_player = player.cloneNode(true);
            block_parents[i].appendChild(new_player);
            player_position = i+1;
        }
        else if(map[i] == 1){
            let new_square = square.cloneNode(true);
            block_parents[i].appendChild(new_square);
        }
        else if(map[i] == 2){
            let new_trap = trap.cloneNode(true);
            block_parents[i].appendChild(new_trap);
        }
        else if(map[i] == 3){
            let new_goal = goal.cloneNode(true);
            block_parents[i].appendChild(new_goal);
        }
        //let new_square = square.cloneNode(true);
        
        block_parents[i].firstElementChild.setAttribute('id','block'+(i+1));
    }
    
}

const map = [0,1,1,2,1,2,2,2,
             1,2,1,2,1,2,2,2,
             2,2,1,2,1,1,1,3,
             1,1,1,2,1,1,2,2,
             1,1,1,2,1,1,2,2,
             2,1,2,1,1,2,2,2,
             2,1,2,1,1,2,2,1,
             1,1,1,1,2,1,1,2]
// const map = [2,2,2,2,2,2,2,2,
//              2,0,1,1,1,2,3,2,
//              2,1,2,2,1,2,1,2,
//              2,1,2,1,1,1,1,2,
//              2,1,1,1,2,2,1,2,
//              2,2,2,2,2,2,1,2,
//              2,1,1,1,1,1,1,2,
//              2,2,2,2,2,2,2,2]