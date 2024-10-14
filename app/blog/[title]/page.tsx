import RoundedContainer from "@/components/custom/RoundedContainer";
import { Button } from "@/components/primitives/button";

interface PageProps {
  params: {
    title: string;
  };
}

export default function Page({ params }: PageProps) {
  const { title } = params;

  return (
    <div className="w-full h-full bg-lightBackground flex justify-center items-center">
      <div className="overflow-hidden w-full">
        <RoundedContainer title={title}>
          <div className="space-y-6">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tortor
              sapien, semper sed semper eu, eleifend quis risus. Etiam sagittis vulputate
              tortor nec vestibulum. Phasellus nec erat ac nunc maximus fermentum. Duis
              purus tellus, luctus non elit nec, fermentum posuere dolor. Mauris sit amet
              nisi nec nibh consectetur fringilla. Vestibulum ante ipsum primis in
              faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum
              vestibulum nunc pharetra, dapibus ante nec, bibendum purus. Maecenas id urna
              sem. Nulla in diam vitae arcu viverra laoreet vel non diam. Aenean non
              mauris eget quam viverra imperdiet at a mi. Sed feugiat pharetra ante quis
              consequat. Vivamus auctor tortor sit amet justo pulvinar, eget laoreet neque
              fringilla. Vivamus in leo ornare, scelerisque est quis, ultrices neque. Sed
              ac ex odio. Vestibulum pharetra mattis dolor, ac vulputate velit mattis at.
              Fusce accumsan pharetra vehicula. Etiam dictum odio tortor, at pellentesque
              quam mattis non. Sed vulputate tellus quis mauris pretium pulvinar. Donec id
              erat venenatis, varius velit vel, scelerisque sem. Phasellus imperdiet
              ligula est, sed dapibus orci tincidunt et. Mauris ante tellus, blandit vitae
              blandit tristique, dignissim a nibh. Nam dignissim, dui auctor interdum
              varius, libero nulla condimentum enim, nec suscipit augue tellus pulvinar
              arcu. Donec tempor ligula massa. In venenatis, nibh vel bibendum suscipit,
              enim mauris ultricies purus, sed elementum ipsum felis sit amet velit.
              Pellentesque fringilla magna eu ligula ultricies, quis dictum dolor
              vehicula. Donec laoreet magna sem, sed imperdiet dui facilisis vel. Aliquam
              malesuada ligula diam, quis ullamcorper ligula tincidunt a. Phasellus
              egestas et quam vitae efficitur. Donec nec augue dignissim, volutpat sapien
              luctus, convallis est. Phasellus ut arcu et massa dictum faucibus. Donec
              lobortis consectetur laoreet. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Cras bibendum faucibus justo, id porta mauris mollis in.
              Sed pharetra ut magna porta ultricies. Duis ut tincidunt dolor. Morbi urna
              nulla, vulputate vel sapien sed, cursus convallis augue. Sed vel convallis
              augue. Sed lorem arcu, eleifend eu cursus a, condimentum nec tellus.
              Curabitur massa dolor, volutpat in elit sit amet, vehicula volutpat leo. Ut
              dictum diam est, id sagittis odio aliquet finibus. Vivamus nec aliquam dui.
              Mauris nec semper nunc. Nunc felis dolor, cursus ut sagittis a, varius vel
              nunc. Phasellus massa turpis, iaculis sed lectus in, pretium porta lorem.
              Pellentesque tincidunt ante sed leo rutrum fermentum. Morbi ut rhoncus mi.
              Donec at dapibus lorem. Quisque non efficitur tellus, at pulvinar velit.
              Quisque nec odio sed eros facilisis hendrerit. Nam accumsan, sapien ac
              feugiat maximus, purus lacus tempor massa, eu suscipit purus quam sed lacus.
              Integer nunc nunc, vestibulum sit amet tortor vitae, tempor sodales tortor.
              Quisque ornare venenatis massa at consectetur. Nullam blandit tincidunt ex,
              id porta sem porttitor eu. Aliquam eu egestas erat. Nullam molestie lorem a
              dui dapibus, non dictum lectus fermentum. Morbi aliquam eleifend varius.
              Vestibulum turpis erat, suscipit gravida nunc ac, dapibus euismod dolor.
              Nunc sed pulvinar augue, sed lobortis nunc. Quisque sit amet tempor ex.
            </p>
            <Button variant={"pill"}>Zurück</Button>
          </div>
        </RoundedContainer>
      </div>
    </div>
  );
}
