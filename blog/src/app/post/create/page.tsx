import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardDescription,
  CardTitle,
  CardAction,
} from "@/components/ui/card";
import PostForm from "@/components/post/page";
function createPost() {
  return (
    <main className="py-10">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-4xl font-bold">
              Create New Post
            </CardTitle>
          </CardHeader>
          <CardContent>
            <PostForm></PostForm>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
export default createPost;
