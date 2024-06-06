'use client'
import { createLocation } from '@/app/action';
import CreationBottomBar from '@/app/components/CreationBottomBar';
import { Select, SelectTrigger, SelectValue, SelectGroup, SelectLabel, SelectContent, SelectItem} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { useCountries } from '@/lib/getCountries';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';

const page = ({params}) => {
    const {getAllCountries } = useCountries();
    const [locationValue, setLocationValue] = useState("");
    
    const LazyMap = dynamic(() => import("@/app/components/Map"), {
        ssr: false,
        loading: () => <Skeleton className="h-[50vh] w-full" />,
      });
    return (
        <>
      <div className="px-5 lg:px-0 lg:w-3/5 mx-auto">
        <h2 className="text-xl lg:text-3xl font-semibold tracking-tight transition-colors mb-10">
          Where is your Home located?
        </h2>
      </div>

      <form action={createLocation}>
      <input type="hidden" name="homeId" value={params.id} />
      <input type="hidden" name="countryValue" value={locationValue} />
      <div className="px-5 lg:px-0 lg:w-3/5 mx-auto mb-36">
          <div className="mb-5">
            <Select required onValueChange={(value) => setLocationValue(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Countries</SelectLabel>
                  {getAllCountries().map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.flag} {item.label} / {item.region}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <LazyMap locationValue={locationValue} />
          </div>

          <CreationBottomBar />
        
        </form>
        </>
    );
};

export default page;