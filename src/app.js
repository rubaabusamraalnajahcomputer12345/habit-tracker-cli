//console.log(process.argv);
//console.log(process.argv[2]);
const [par1,par2,par3,par4,par5]=process.argv;
//console.log(par1,par2,par3,par4);
const fs=require('fs')
const data=fs.readFileSync('../data/habits.json','utf-8')
//console.log(data);
//console.log(JSON.parse(data));
const habits=JSON.parse(data);
const CommandHandler=(command)=>{
switch(command){
    case 'list': //Getting all habits from data/habits.json
        {   
            console.log('List all habits:');
             console.log('HabbitName  Date  Done')
             console.log('----------------------------')
             habits.forEach((habit)=>{
                console.log(`${habit.habitName} (${habit.date})  ${habit.done ? '✓' : '✗'}`);

             })
            break;
        }
    
    case 'add': //Adding a new habit to habits.json file
       {
        const date=new Date().toISOString().split('T')[0];
        let exist=false;
        let id=0
        habits.forEach((habit)=>{
            id=Math.max(id,habit.id)
        })
        const data={
            id:id+1,
            habitName:par4,
            date:date,
            done:false
        }
        if(!par4){
            console.log('Please provide a name for the new habit!!')
            break;
        }
        //Check if the habit exist or not
        habits.forEach((habit)=>{
            if(habit.habitName===par4){
                console.log('Habit already exist !!')
                exist=true;
            }
        })
        
        if(exist) break

        habits.push(data)
        fs.writeFileSync('../data/habits.json', JSON.stringify(habits))
        console.log('New habit added successfully ✓')
        break;
       }

    case 'delete':{
        const id=parseInt(par4);
        const habit=habits.find((habit)=>habit.id===id);
        if(!habit){
            console.log(`Habit with the id:${id} not found`)
        }
        else{
            let index=habits.indexOf(habit);
            habits.splice(index,1)
            fs.writeFileSync('../data/habits.json', JSON.stringify(habits))
            console.log(`Habit with the id:${id} deleted successfully ✓`) 
        }
        break
    }

    case 'done'://Marking a habit as done
    {   
        const id=parseInt(par4);
        const habit=habits.find((habit)=>habit.id===id);
        if(!habit){
            console.log(`Habit with the id:${id} not found`)
        }
        else{
            habit.done=true;
            fs.writeFileSync('../data/habits.json', JSON.stringify(habits))
            console.log('Habit marked as done successfully ✓')
        }
        break
    }
    
    case'today': //Getting all habits for today
    {   
        const today=new Date().toISOString().split('T')[0];
        const habitsToday=habits.filter((habit)=>habit.date===today);
        if(habitsToday.length===0){
            console.log('No habits for today')
        }
        else{
            console.log('Habits for today:');
            console.log('HabbitName  Date  Done')
            console.log('----------------------------')
            habitsToday.forEach((habit)=>{
            console.log(`${habit.habitName} (${habit.date})  ${habit.done ? '✓' : '✗'}`);
            })
        }
        break
    }

    case 'help'://Getting all available Commands
    {
        console.log('Available commands:')
        console.log('-------------------------------')
        console.log('list - List all habits')
        console.log('add <habitName> - Add a new habit')
        console.log('delete <habitId> - Delete a habit')
        console.log('done <habitId> - Mark a habit as done')
        console.log('today - List all habits for today')
        console.log('help - Show available commands')
        break
    }
    
    case 'edit':{ //Edit the name of habit using id
       const id=parseInt(par4);
       const habit=habits.find((habit)=>habit.id===id);
       if(!habit){
        console.log(`Habit with id:${id} not found`)
       }
       else{
        const habitname=par5;
        if(!habitname){
            console.log('Please provide a new habit name')
            break;
        }
        habit.habitName=habitname
        //reflet the change on the json file
        fs.writeFileSync('../data/habits.json',JSON.stringify(habits))
        console.log('Habit Name edited successfully ✓')
       }
       break
    }

    case 'stats':{
        console.log('Statistics')
        console.log('-----------------')
        console.log(`Total habits:${habits.length}`)
        let completed=0
        let pending=0
        habits.forEach((habit)=>{
            if(habit.done) completed++
            else pending++
        })
        console.log(`Completed habits:${completed}`)
        console.log(`Pending habits:${pending}`)

        console.log(`Completion rate: ${habits.length?Math.trunc(completed / habits.length*100) : 0}%`)
        break
    }

        default:
            console.log('Invalid command');
            break;
}
}
CommandHandler(process.argv[2]);