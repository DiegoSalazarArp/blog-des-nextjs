import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default async function Page() {
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="sm:w-1/3 flex items-start justify-center">
            <Avatar className="w-40 h-40 sm:w-full sm:h-auto aspect-square">
              <AvatarImage src="/placeholder.svg?height=300&width=300" alt="Jane Doe" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
          <div className="sm:w-2/3 space-y-4">
            <div>
              <h2 className="text-3xl font-bold">Jane Doe</h2>
              <p className="text-xl text-muted-foreground">Tech Enthusiast & Blogger</p>
            </div>
            <p className="text-muted-foreground">
              Jane is a passionate tech writer with over 10 years of experience in the industry.
              She loves exploring new technologies and sharing her insights with the world.
              Her articles cover a wide range of topics, from cutting-edge AI developments to practical coding tips for beginners.
            </p>
            <div>
              <h3 className="text-lg font-semibold mb-2">Areas of Expertise:</h3>
              <ul className="list-disc list-inside text-muted-foreground">
                <li>Artificial Intelligence and Machine Learning</li>
                <li>Web Development (React, Vue, Angular)</li>
                <li>Cloud Computing (AWS, Azure, GCP)</li>
                <li>Cybersecurity and Data Privacy</li>
              </ul>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" size="icon">
                {/* <Twitter className="h-5 w-5" /> */}
                <span className="sr-only">Twitter</span>
              </Button>
              <Button variant="outline" size="icon">
                {/* <Facebook className="h-5 w-5" /> */}
                <span className="sr-only">Facebook</span>
              </Button>

            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}