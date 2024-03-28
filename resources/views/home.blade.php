@extends('layouts.app')

@section('content')
{{-- <div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('Dashboard') }}</div>

                <div class="card-body">
                    <ul>
                        @foreach ($posts as $post)
                        <li>{{$post->name}}</li>
                        @endforeach
                    </ul>
                </div>
                <form action="{{route('store')}}" method="POST">
                    @csrf
                    <input type="text" name="name" />
                    <input type="submit" value="登録" />
                </form>
            </div>
        </div>
    </div>
</div> --}}
{{-- <div id="example"></div> --}}
@endsection
