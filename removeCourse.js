const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost/MyCourses')

const courseSchema=new mongoose.Schema({
    name:String,
    _id:String,
    author:String,
    tags: [String],
    date: Date,
    isPublished: Boolean,
    price: Number
});
const Course=mongoose.model('Course',courseSchema);

async function getCourses(){
    return await Course
    .find({isPublished:true,tags:'backend'})
    .sort({name:1})
    .select('name author')
}
async function run(){
  const courses=await getCourses();
  console.log(courses)
}
//run();
async function updateCourse(id)
{
    const result = await Course.update({ _id: mongoose.Types.ObjectId(id) }, { 
        $set: { author: 'Mudassir Ali Baig', isPublished: true }
    });
 
console.log(result)
}
async function removeCourse(id){
    const result=await Course.deleteOne({_id:id})
    console.log(result)
}
removeCourse("5a68fdf95db93f6477053ddd")
//updateCourse("5a68fdf95db93f6477053ddd")
