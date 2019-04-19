const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost/MyCourses')

const courseSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:255,
        
    },
    date:{
        type:Date,
        default:Date.now
    },
    category:{
        type:String,
        required:true,
        enum:['web','mobile','network'],
        lowercase:true,
        //uppercase:true,
        trim:true
    },
    _id:String,
    author:String,
    tags: {
        type:Array,
        //Async Validator below
        
        validate:{
            isAsync:true,
            validator:function(value,callback){
                setTimeout(()=>{
                //Do some Async work
                const result=value && value.length > 0; 
                callback(result)    
            },1000)
                
                
                
            },
            message:'A course should have atleast one tag',

        }
    },
    
    isPublished: Boolean,
    price: {
        type:Number,
        required:function(){
            return this.isPublished
        },
        min:10,
        max:200,
        get:v=>Math.round(v),
        set:v=>Math.round(v)    
    }
});
const Course=mongoose.model('Course',courseSchema);

async function createCourse(){
const course = new Course({
    name:'TensorFlow Course',
    _id:"5a68fdf95db93f6477053d65",
    
    category:'Web',
    author: 'Mosh',
    tags:['frontend'],
    isPublished:true,
    price:15.5,
    
    });
    try{
    const result=await course.save();
    
    console.log(result);
    }
    catch(ex){
        for (field in ex.errors)
            console.log(ex.errors[field].message)
    }
}

async function getCourses(){
    return await Course
    .find({_id:"5a68fdf95db93f6477053d65"})
    .sort({name:1})
    .select('name author price')
//console.log(courses[0].price)
}
async function run(){
  const courses=await getCourses();
  console.log(courses[0].price)
}
//run();
async function updateCourse(id)
{
    const result = await Course.update({ _id: mongoose.Types.ObjectId(id) }, { 
        $set: { author: 'Mudassir Ali Baig', isPublished: true }
    });
 /*const result=await Course.update({_id:id},{
    $set:{
        author:"Mubashir Ali",
        isPublished:false

    }
})
*/
console.log(result)
}
run();
/*async function run(){
    const courses = await getCourse();
    console.log(courses);
}

updateCourse("5a68fdf95db93f6477053ddd")
//run
*/