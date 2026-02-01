import React from 'react'
import { Search } from 'lucide-react'
import { Input } from '../../ui/input'
import { Button } from '../../ui/button'

type Props = {}

const SearchBar = (props: Props) => {
  return (
    <div className="relative flex min-w-[60%] items-center rounded-full border border-border/60 bg-muted/40">
      <Button
        type="submit"
        size="sm"
        variant="ghost"
        className="
          absolute left-1
          h-8 w-8
          rounded-full
          p-0
          text-muted-foreground
          hover:bg-muted/60
        "
      >
        <Search className="h-4 w-4" />
        <span className="sr-only">Search</span>
      </Button>

      <Input
        type="text"
        placeholder="Search by title"
        className="
          h-10
          rounded-full
          border-0
          bg-transparent
          pl-11
          pr-4
          text-sm
          placeholder:text-muted-foreground
          focus-visible:ring-0
          focus-visible:ring-offset-0
        "
      />
    </div>
  )
}

export default SearchBar
