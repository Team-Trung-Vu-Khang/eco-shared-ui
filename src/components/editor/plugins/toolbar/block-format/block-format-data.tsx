import {
  CodeIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  ListIcon,
  ListOrderedIcon,
  ListTodoIcon,
  QuoteIcon,
  TextIcon,
} from "lucide-react"

export const blockTypeToBlockName: Record<
  string,
  { label: string; icon: React.ReactNode }
> = {
  paragraph: {
    label: "Đoạn văn",
    icon: <TextIcon className="size-4" />,
  },
  h1: {
    label: "Tiêu đề 1",
    icon: <Heading1Icon className="size-4" />,
  },
  h2: {
    label: "Tiêu đề 2",
    icon: <Heading2Icon className="size-4" />,
  },
  h3: {
    label: "Tiêu đề 3",
    icon: <Heading3Icon className="size-4" />,
  },
  number: {
    label: "Danh sách đánh số",
    icon: <ListOrderedIcon className="size-4" />,
  },
  bullet: {
    label: "Danh sách gạch đầu dòng",
    icon: <ListIcon className="size-4" />,
  },
  check: {
    label: "Danh sách kiểm",
    icon: <ListTodoIcon className="size-4" />,
  },
  code: {
    label: "Khối mã",
    icon: <CodeIcon className="size-4" />,
  },
  quote: {
    label: "Trích dẫn",
    icon: <QuoteIcon className="size-4" />,
  },
}
