import FeatureBento from '../components/FeatureBento'; // ইমপোর্ট করুন
import CourseList from '../components/CourseList';
import Hero from '../components/hero';

const Home = () => {
    return (
        <div>
            <Hero />
            <FeatureBento /> 
            <CourseList />
        </div>
    );
};